# React Website + MongoDB Atlas Setup Guide

## Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (free tier available)
- Basic knowledge of React and Node.js

## Step 1: Set Up MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new organization and project

### 1.2 Create a Cluster
1. Click "Create" or "Build a Database"
2. Choose "M0 Sandbox" (free tier)
3. Select your preferred cloud provider and region
4. Name your cluster (e.g., "MyCluster")
5. Click "Create Cluster"

### 1.3 Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password (save these!)
5. Select "Built-in Role" → "Read and write to any database"
6. Click "Add User"

### 1.4 Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Choose "Allow Access from Anywhere" (0.0.0.0/0) for development
   - **Note**: In production, specify your server's IP address
4. Click "Confirm"

### 1.5 Get Connection String
1. Go to "Database" and click "Connect" on your cluster
2. Choose "Connect your application"
3. Select "Node.js" and version "4.1 or later"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 2: Set Up Backend (Node.js + Express)

### 2.1 Initialize Backend Project
```bash
mkdir my-app-backend
cd my-app-backend
npm init -y
```

### 2.2 Install Dependencies
```bash
npm install express mongoose cors dotenv
npm install -D nodemon
```

### 2.3 Create Environment Variables
Create `.env` file in backend root:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
PORT=5000
```

### 2.4 Create Server File
Create `server.js`:
```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Sample Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2.5 Update package.json Scripts
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## Step 3: Set Up Frontend (React)

### 3.1 Create React App
```bash
npx create-react-app my-app-frontend
cd my-app-frontend
```

### 3.2 Install HTTP Client
```bash
npm install axios
```

### 3.3 Create API Service
Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userAPI = {
  getUsers: () => api.get('/users'),
  createUser: (userData) => api.post('/users', userData),
};

export default api;
```

### 3.4 Update App.js
```javascript
import React, { useState, useEffect } from 'react';
import { userAPI } from './services/api';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userAPI.createUser(formData);
      setFormData({ name: '', email: '' });
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + MongoDB Atlas</h1>
        
        <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ margin: '5px', padding: '10px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ margin: '5px', padding: '10px' }}
          />
          <button type="submit" style={{ margin: '5px', padding: '10px' }}>
            Add User
          </button>
        </form>

        <div>
          <h2>Users</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul style={{ textAlign: 'left' }}>
              {users.map(user => (
                <li key={user._id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
```

## Step 4: Run the Application

### 4.1 Start Backend Server
```bash
cd my-app-backend
npm run dev
```
Server should run on http://localhost:5000

### 4.2 Start React App
```bash
cd my-app-frontend
npm start
```
React app should run on http://localhost:3000

## Step 5: Test the Connection

1. Open http://localhost:3000 in your browser
2. Try adding a user through the form
3. Check if users appear in the list
4. Verify data in MongoDB Atlas dashboard under "Browse Collections"

## Important Security Notes

### For Production:
1. **Environment Variables**: Never commit `.env` files to version control
2. **Network Access**: Restrict IP addresses in MongoDB Atlas
3. **User Permissions**: Create specific users with minimal required permissions
4. **Input Validation**: Add proper validation and sanitization
5. **HTTPS**: Use HTTPS in production
6. **CORS**: Configure CORS properly for your domain

### Additional Security Measures:
```javascript
// Add to server.js for basic security
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
```

## Troubleshooting Common Issues

1. **Connection Timeout**: Check network access settings in Atlas
2. **Authentication Failed**: Verify username/password in connection string
3. **CORS Errors**: Ensure cors middleware is properly configured
4. **Port Conflicts**: Change ports if 3000 or 5000 are already in use

## Next Steps

- Add authentication (JWT tokens)
- Implement error handling middleware
- Add input validation with libraries like Joi
- Set up proper logging
- Deploy to cloud platforms (Heroku, Netlify, Vercel)
