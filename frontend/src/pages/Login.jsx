import React from 'react';
import { Button } from '@mui/material';

const Login = () => {
  const handleGoogleLogin = () => {
    window.open('http://localhost:5000/auth/google', '_self');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">ERP System Login</h2>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={ handleGoogleLogin }
          className="py-2"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;