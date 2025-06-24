# Project Plan: Authentication Member Site (ERP Phase 1)

## Overview
Build a secure authentication system for an e-commerce ERP with:
- Google OAuth login
- Email/password fallback
- User roles (free, paid, admin)
- Admin dashboard for user management

## Technology Stack
```mermaid
graph LR
    A[Backend] --> B[Node.js/Express]
    A --> C[MongoDB/Mongoose]
    A --> D[Passport.js]
    
    E[Frontend] --> F[React 18]
    E --> G[Vite]
    E --> H[Material UI]
    E --> I[Tailwind CSS]
    
    J[DevOps] --> K[Jest]
    J --> L[Cypress]
```

## Database Schema
```javascript
// models/User.js
{
  email: { type: String, unique: true },
  password: { type: String }, // hashed
  role: { 
    type: String, 
    enum: ['free', 'paid', 'admin'],
    default: 'free'
  },
  authProvider: {
    type: String,
    enum: ['google', 'email'],
    required: true
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
}
```

## Implementation Phases

### Phase 1: Core Infrastructure (Priority)
```mermaid
gantt
    title Phase 1 - Core Infrastructure
    dateFormat  YYYY-MM-DD
    section Backend
    MongoDB Setup           :a1, 2025-06-25, 2d
    Admin API Endpoints     :a2, after a1, 3d
    Auth System (Google)    :a3, after a1, 3d
    
    section Frontend
    Admin Dashboard Shell   :b1, 2025-06-25, 2d
    User Management UI      :b2, after b1, 3d
```

### Phase 2: Authentication
```mermaid
sequenceDiagram
    User->>Frontend: Login Request
    Frontend->>Backend: /auth/google
    Backend->>Google: Authentication
    Google-->>Backend: Token
    Backend->>DB: Create/Update User
    Backend-->>Frontend: JWT
    Frontend->>User: Dashboard
```

### Phase 3: User Features
- Membership upgrade flow
- Free tier feature set
- Paid tier feature set
- Profile management

## Testing Strategy
| Test Type       | Tools          | Coverage Goal |
|-----------------|----------------|---------------|
| Unit Testing    | Jest           | 80%           |
| Integration     | Supertest      | 100% Routes   |
| E2E             | Cypress        | Critical Paths|
| Security        | OWASP ZAP      | High Risk     |

## Deployment Plan
1. Development: Local MongoDB
2. Staging: Atlas free tier
3. Production: Atlas paid cluster

## Next Steps
1. Set up project structure
2. Install dependencies
3. Implement MongoDB connection
4. Create admin dashboard skeleton