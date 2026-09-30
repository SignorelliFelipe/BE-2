import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const generateToken = (user) => {
  const payload = { id: user._id, email: user.email, role: user.role };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '24h' });
};

export const generateResetToken = (user) => {
  const payload = { id: user._id, email: user.email };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret); 
};