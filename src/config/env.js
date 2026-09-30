import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 8080,
  mongoUrl: process.env.MONGO_URL,
  jwtSecret: process.env.JWT_SECRET,
  mailUser: process.env.MAIL_USER,
  mailPass: process.env.MAIL_PASS,
  mailHost: process.env.MAIL_HOST,
  mailPort: process.env.MAIL_PORT,
  baseUrl: process.env.BASE_URL,
};