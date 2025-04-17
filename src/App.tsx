import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { User } from './types/User';
import { AddUserPage } from './pages/AddUserPage';
import { EditUserPage } from './pages/EditUserPage';
import { UserList } from './components/UserList';
import { getStoredUsers, saveUsers } from './utils/storage';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(getStoredUsers());
  }, []);

  const addUser = (user: User) => {
    const updated = [...users, user];
    setUsers(updated);
    saveUsers(updated);
  };

  const updateUser = (updatedUser: User) => {
    const updated = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updated);
    saveUsers(updated);
  };

  return (
    <Router>
      <div className="container">
        <h2>User Management</h2>
        <nav>
          <Link to="/">Home</Link> | <Link to="/add">Add User</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<UserList users={users} onEdit={user => window.location.assign(`/edit/${user.id}`)} />}
          />
          <Route path="/add" element={<AddUserPage users={users} onAddUser={addUser} />} />
          <Route path="/edit/:id" element={<EditUserPage onUpdateUser={updateUser} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
