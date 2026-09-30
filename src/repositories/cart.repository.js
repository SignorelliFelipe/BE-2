export class CartRepository {
  constructor(cartDAO) {
    this.dao = cartDAO;
  }
  create(data) {
    return this.dao.create(data);
  }
  getById(id) {
    return this.dao.findById(id);
  }
  updateProducts(id, products) {
    return this.dao.updateProducts(id, products);
  }
}