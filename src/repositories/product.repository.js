export class ProductRepository {
  constructor(productDAO) {
    this.dao = productDAO;
  }
  create(data) {
    return this.dao.create(data);
  }
  getAll(filter) {
    return this.dao.findAll(filter);
  }
  getById(id) {
    return this.dao.findById(id);
  }
  update(id, data) {
    return this.dao.update(id, data);
  }
  delete(id) {
    return this.dao.delete(id);
  }
  updateStock(id, newStock) {
    return this.dao.updateStock(id, newStock);
  }
}