import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminHome;
