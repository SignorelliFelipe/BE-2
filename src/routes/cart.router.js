import { Router } from 'express';
import passport from 'passport';
import { authorize } from '../middlewares/authorization.middleware.js';
import { getMyCart, addProductToCart, purchaseCart } from '../controllers/cart.controller.js';

const router = Router();

router.get('/', passport.authenticate('current', { session: false }), authorize('user'), getMyCart);

router.post(
  '/products/:pid',
  passport.authenticate('current', { session: false }),
  authorize('user'),
  addProductToCart
);

router.post(
  '/purchase',
  passport.authenticate('current', { session: false }),
  authorize('user'),
  purchaseCart
);

export default router;