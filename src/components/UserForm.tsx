import React, { useState } from 'react';
import { User } from '../types/User';

interface Props {
  initialData?: User;
  existingEmails: string[];
  onSubmit: (user: User) => void;
}

export const UserForm: React.FC<Props> = ({ initialData, existingEmails, onSubmit }) => {
  const [user, setUser] = useState<User>(
    initialData ?? {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      location: '',
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!user.firstName) errs.firstName = 'Required';
    if (!user.lastName) errs.lastName = 'Required';
    if (!user.phone || !/^\d{10}$/.test(user.phone)) errs.phone = 'Invalid phone';
    if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) errs.email = 'Invalid email';
    else if (!initialData && existingEmails.includes(user.email)) errs.email = 'Email already exists';

    ['role', 'location', 'department'].forEach(field => {
      if (!user[field as keyof User]) errs[field] = 'Required';
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      const newUser = { ...user, id: user.id || Date.now().toString() };
      onSubmit(newUser);
    }
  };

  return (
    <div className="form-container">
      <h3>{initialData ? 'Edit User' : 'Add User'}</h3>
      <div className="form-grid">
        {['firstName', 'lastName', 'phone', 'email'].map(field => (
          <div key={field}>
            <label>{field.toUpperCase()} *</label>
            <input
              value={user[field as keyof User]}
              onChange={e => setUser({ ...user, [field]: e.target.value })}
              placeholder={field}
            />
            <span className="error">{errors[field]}</span>
          </div>
        ))}
        {['role', 'location', 'department'].map(field => (
          <div key={field}>
            <label>{field.toUpperCase()} *</label>
            <input
              value={user[field as keyof User]}
              onChange={e => setUser({ ...user, [field]: e.target.value })}
              placeholder={field}
            />
            <span className="error">{errors[field]}</span>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>{initialData ? 'Update' : 'Submit'}</button>
    </div>
  );
};
