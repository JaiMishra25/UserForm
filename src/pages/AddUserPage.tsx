import React from 'react';
import { UserForm } from '../components/UserForm';
import { useNavigate } from 'react-router-dom';
import { User } from '../types/User';

interface Props {
  users: User[];
  onAddUser: (user: User) => void;
}

export const AddUserPage: React.FC<Props> = ({ users, onAddUser }) => {
  const navigate = useNavigate();

  const handleSubmit = (user: User) => {
    onAddUser(user);
    navigate('/');
  };

  return (
    <UserForm
      existingEmails={users.map(u => u.email)}
      onSubmit={handleSubmit}
    />
  );
};
