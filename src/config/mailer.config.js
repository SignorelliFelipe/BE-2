import nodemailer from 'nodemailer';
import { config } from './env.js';

export const transporter = nodemailer.createTransport({
  host: config.mailHost,
  port: config.mailPort,
  secure: false, // true solo si el puerto es 465
  auth: {
    user: config.mailUser,
    pass: config.mailPass,
  },
});