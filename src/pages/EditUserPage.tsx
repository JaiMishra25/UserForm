import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { User } from '../types/User';

interface Props {
  users: User[];
  onUpdateUser: (user: User) => void;
}

export const EditUserPage: React.FC<Props> = ({ users, onUpdateUser }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const userToEdit = users.find(u => u.id === id);

  const handleUpdate = (user: User) => {
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
