import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import authRouter from './routes/auth.router.js';
import passport from './config/passport.config.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use(passport.initialize());
app.use('/api/sessions', authRouter);
app.use('/api/sessions', authRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);


mongoose
  .connect(config.mongoUrl)
  .then(() => {
    console.log('Mongo conectado');
    app.listen(config.port, () => console.log(`Servidor en puerto ${config.port}`));
  })
  .catch((err) => console.error('Error de conexión:', err));