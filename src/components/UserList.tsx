import React, { useState } from 'react';
import { User } from '../types/User';
import { useNavigate } from 'react-router-dom';

interface Props {
  users: User[];
  onEdit: (user: User) => void;
}

export const UserList: React.FC<Props> = ({ users, onEdit }) => {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const navigate = useNavigate();

  const suggestions = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectSuggestion = (email: string) => {
    setSearch(email);
    setFilteredUsers(users.filter(user => user.email === email));
    setShowSuggestions(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value === '') {
      setFilteredUsers(users);
      setShowSuggestions(false);
    } else {
      setShowSuggestions(true);
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search by email..."
            value={search}
            onChange={handleSearchChange}
            className="border p-2 rounded w-full"
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && search.trim() !== '' && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-auto">
              {suggestions.map(user => (
                <li
                  key={user.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectSuggestion(user.email)}
                >
                  {user.email} — <span className="text-gray-500">{user.firstName} {user.lastName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={() => navigate('/add')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Add
        </button>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Function</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4">
                No users found.
              </td>
            </tr>
          ) : (
            filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="p-2 border font-semibold">
                  {user.firstName} {user.lastName}
                </td>
                <td className="p-2 border">{user.phone}</td>
                <td className="p-2 border">{user.role}</td>
                <td className="p-2 border">{user.location}</td>
                <td className="p-2 border">{user.department}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 underline"
                    onClick={() => onEdit(user)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
