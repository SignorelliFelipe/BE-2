import bcrypt from 'bcrypt';

export const hashPassword = (password) => bcrypt.hashSync(password, 10);
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);