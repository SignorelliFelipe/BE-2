import { UserModel } from '../models/user.model.js';

export class UserDAO {
  async create(data) {
    return UserModel.create(data);
  }
  async findByEmail(email) {
    return UserModel.findOne({ email });
  }
  async findById(id) {
    return UserModel.findById(id);
  }
  async updatePassword(id, newHashedPassword) {
    return UserModel.findByIdAndUpdate(id, { password: newHashedPassword }, { new: true });
  }
}