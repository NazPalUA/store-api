import { Router } from 'express';
import { getAllProducts, getAllProductsStatic } from '../controllers/product';
import { createProduct } from '../controllers/product/createProduct';
import { validate } from '../middleware/validate';
import { createProductSchema } from '../schemas/product.schema';

const router = Router();

router
  .route('/')
  .get(getAllProducts)
  .post(validate(createProductSchema), createProduct);

router.route('/static').get(getAllProductsStatic);

export default router;
