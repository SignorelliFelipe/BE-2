export class UserRepository {
  constructor(userDAO) {
    this.dao = userDAO;
  }
  create(data) {
    return this.dao.create(data);
  }
  getByEmail(email) {
    return this.dao.findByEmail(email);
  }
  getById(id) {
    return this.dao.findById(id);
  }
  updatePassword(id, hashedPassword) {
    return this.dao.updatePassword(id, hashedPassword);
  }
}