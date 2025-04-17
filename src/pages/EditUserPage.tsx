import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { User } from '../types/User';
import { getStoredUsers, saveUsers } from '../utils/storage';

interface Props {
  onUpdateUser: (user: User) => void;
}

export const EditUserPage: React.FC<Props> = ({ onUpdateUser }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const users = getStoredUsers();
  const userToEdit = users.find(u => u.id === id);

  const handleUpdate = (user: User) => {
    const updatedUsers = users.map(u => (u.id === user.id ? user : u));
    saveUsers(updatedUsers);
    onUpdateUser(user);
    navigate('/');
  };

  return userToEdit ? (
    <UserForm
      initialData={userToEdit}
      existingEmails={users.map(u => u.email).filter(e => e !== userToEdit.email)}
      onSubmit={handleUpdate}
    />
  ) : (
    <p>User not found</p>
  );
};
