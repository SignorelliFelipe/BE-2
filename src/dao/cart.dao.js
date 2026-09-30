import { CartModel } from '../models/cart.model.js';

export class CartDAO {
  async create(data = { products: [] }) {
    return CartModel.create(data);
  }
  async findById(id) {
    return CartModel.findById(id).populate('products.product');
  }
  async updateProducts(id, products) {
    return CartModel.findByIdAndUpdate(id, { products }, { new: true });
  }
}