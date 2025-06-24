import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user.id,
      email: req.user.email,
      displayName: req.user.displayName,
      avatar: req.user.avatar,
      role: req.user.role
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;