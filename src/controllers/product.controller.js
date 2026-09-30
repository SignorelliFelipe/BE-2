import { productRepository } from '../repositories/index.js';

export const getProducts = async (req, res) => {
  try {
    const products = await productRepository.getAll();
    res.json({ status: 'success', payload: products });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await productRepository.getById(req.params.pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productRepository.create(req.body);
    res.status(201).json({ status: 'success', payload: newProduct });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await productRepository.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', payload: updated });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productRepository.delete(req.params.pid);
    if (!deleted) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};