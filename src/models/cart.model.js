import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, min: 1, default: 1 },
    },
  ],
});

export const CartModel = mongoose.model('Cart', cartSchema);