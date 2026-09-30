import { cartRepository, productRepository, ticketRepository } from '../repositories/index.js';
import { v4 as uuidv4 } from 'uuid';

export const processPurchase = async (userCartId, userEmail) => {
  const cart = await cartRepository.getById(userCartId);
  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  const purchasedItems = [];
  const notPurchasedItems = [];
  let totalAmount = 0;

  for (const item of cart.products) {
    const product = item.product; 
    if (product.stock >= item.quantity) {
      await productRepository.updateStock(product._id, product.stock - item.quantity);
      totalAmount += product.price * item.quantity;
      purchasedItems.push({ product: product._id, quantity: item.quantity });
    } else {
      notPurchasedItems.push({ product: product._id, quantity: item.quantity });
    }
  }

  let ticket = null;
  if (purchasedItems.length > 0) {
    ticket = await ticketRepository.create({
      code: uuidv4(),
      amount: totalAmount,
      purchaser: userEmail,
    });
  }

  await cartRepository.updateProducts(userCartId, notPurchasedItems);

  return {
    ticket,
    notPurchasedProductIds: notPurchasedItems.map((i) => i.product),
  };
};