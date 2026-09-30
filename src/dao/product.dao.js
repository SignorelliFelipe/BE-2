import { ProductModel } from '../models/product.model.js';

export class ProductDAO {
  async create(data) {
    return ProductModel.create(data);
  }
  async findAll(filter = {}) {
    return ProductModel.find(filter);
  }
  async findById(id) {
    return ProductModel.findById(id);
  }
  async update(id, data) {
    return ProductModel.findByIdAndUpdate(id, data, { new: true });
  }
  async delete(id) {
    return ProductModel.findByIdAndDelete(id);
  }
  async updateStock(id, newStock) {
    return ProductModel.findByIdAndUpdate(id, { stock: newStock }, { new: true });
  }
}