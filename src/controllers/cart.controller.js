import { cartRepository, productRepository } from '../repositories/index.js';
import { processPurchase } from '../services/purchase.service.js';

export const getMyCart = async (req, res) => {
  try {
    const cart = await cartRepository.getById(req.user.cart);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { pid } = req.params;
    const { quantity = 1 } = req.body;
    const cid = req.user.cart;

    const product = await productRepository.getById(pid);
    if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });

    const cart = await cartRepository.getById(cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });

    const existing = cart.products.find((p) => p.product._id.toString() === pid);

    let updatedProducts;
    if (existing) {
      updatedProducts = cart.products.map((p) =>
        p.product._id.toString() === pid
          ? { product: p.product._id, quantity: p.quantity + quantity }
          : { product: p.product._id, quantity: p.quantity }
      );
    } else {
      updatedProducts = [
        ...cart.products.map((p) => ({ product: p.product._id, quantity: p.quantity })),
        { product: pid, quantity },
      ];
    }

    const updatedCart = await cartRepository.updateProducts(cid, updatedProducts);
    res.json({ status: 'success', payload: updatedCart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const result = await processPurchase(req.user.cart, req.user.email);

    if (!result.ticket) {
      return res.status(400).json({
        status: 'error',
        message: 'No se pudo completar la compra: sin stock suficiente en ningún producto',
        payload: result,
      });
    }

    res.json({
      status: 'success',
      message: result.notPurchasedProductIds.length > 0
        ? 'Compra parcial: algunos productos no tenían stock suficiente'
        : 'Compra completa',
      payload: result,
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};