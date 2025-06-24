import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/current-user', {
          credentials: 'include'
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/logout';
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={ { flexGrow: 1 } }>
            ERP Admin Dashboard
          </Typography>
          { user && (
            <div style={ { display: 'flex', alignItems: 'center' } }>
              <Avatar
                src={ user.avatar }
                alt={ user.displayName }
                sx={ { width: 32, height: 32, marginRight: 1 } }
              />
              <Typography variant="subtitle1" sx={ { marginRight: 2 } }>
                { user.displayName }
              </Typography>
              <Button color="inherit" onClick={ handleLogout }>
                Logout
              </Button>
            </div>
          ) }
        </Toolbar>
      </AppBar>

      <div className="p-6">
        <Typography variant="h4" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography paragraph>
          This is the main administration interface for the ERP system.
          Here you can manage users, products, orders, and other business operations.
        </Typography>
      </div>
    </div>
  );
};

export default AdminDashboard;