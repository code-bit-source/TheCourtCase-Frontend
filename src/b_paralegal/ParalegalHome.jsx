import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ParalegalHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  return (
    <div>
      <h1>Paralegal Home</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ParalegalHome;
