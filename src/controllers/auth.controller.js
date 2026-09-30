import { userRepository } from '../repositories/index.js';
import { CartModel } from '../models/cart.model.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken, generateResetToken, verifyToken } from '../utils/jwt.js';
import { sendResetPasswordEmail } from '../services/mail.service.js';
import { UserDTO } from '../dto/user.dto.js';

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const exists = await userRepository.getByEmail(email);
    if (exists) return res.status(400).json({ status: 'error', message: 'El email ya está registrado' });

    const newCart = await CartModel.create({ products: [] });

    const newUser = await userRepository.create({
      first_name,
      last_name,
      email,
      age,
      password: hashPassword(password),
      cart: newCart._id,
    });

    res.status(201).json({ status: 'success', payload: { id: newUser._id, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userRepository.getByEmail(email);
    if (!user) return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    const token = generateToken(user);

    res
      .cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({ status: 'success', message: 'Login exitoso' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ status: 'success', message: 'Logout exitoso' });
};

export const getCurrentUser = (req, res) => {
  // req.user lo carga passport con la estrategia "current"
  res.json({ status: 'success', payload: new UserDTO(req.user) });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userRepository.getByEmail(email);
    if (!user) {
      // No revelamos si el email existe o no, por seguridad
      return res.json({ status: 'success', message: 'Si el email existe, te enviamos un correo con instrucciones' });
    }

    const token = generateResetToken(user);
    await sendResetPasswordEmail(user.email, token);

    res.json({ status: 'success', message: 'Si el email existe, te enviamos un correo con instrucciones' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    let payload;
    try {
      payload = verifyToken(token);
    } catch (err) {
      return res.status(400).json({ status: 'error', message: 'El enlace expiró o es inválido, solicitá uno nuevo' });
    }

    const user = await userRepository.getById(payload.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

    // No permitir restablecer a la misma contraseña
    if (comparePassword(newPassword, user.password)) {
      return res.status(400).json({ status: 'error', message: 'La nueva contraseña no puede ser igual a la anterior' });
    }

    await userRepository.updatePassword(user._id, hashPassword(newPassword));

    res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};