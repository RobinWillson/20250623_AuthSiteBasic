import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem
} from '@mui/material';

const AdminDashboard = () => {
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@example.com', role: 'admin' },
    { id: 2, email: 'user1@example.com', role: 'free' },
    { id: 3, email: 'user2@example.com', role: 'free' },
  ]);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
    // TODO: Connect to backend API
  };

  return (
    <Box sx={ { padding: 3 } }>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <TableContainer component={ Paper }>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map((user) => (
              <TableRow key={ user.id }>
                <TableCell>{ user.id }</TableCell>
                <TableCell>{ user.email }</TableCell>
                <TableCell>
                  <Select
                    value={ user.role }
                    onChange={ (e) => handleRoleChange(user.id, e.target.value) }
                    size="small"
                  >
                    <MenuItem value="free">Free</MenuItem>
                    <MenuItem value="paid">Paid</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary">
                    Save
                  </Button>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminDashboard;