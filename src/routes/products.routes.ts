import { Router } from 'express';
import { createProduct, getAllProducts } from '../controllers/product';
import { validate } from '../middleware/validate';
import { createProductSchema } from '../schemas/product.schema';

const router = Router();

router
  .route('/')
  .get(getAllProducts)
  .post(validate(createProductSchema), createProduct);

export default router;
