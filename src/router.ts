import {
  getOneProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from './handlers/product';
import { handleInputErrors } from './modules/middleware';
import { Router } from 'express';
import { body, oneOf } from 'express-validator';

const router = Router();

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

router.get('/update', () => {});
router.get('/update/:id', (id) => {});
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  (id) => {}
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  (update) => {}
);
router.delete('/update/:id', (id) => {});

router.get('/updatepoint', (req, res) => {});
router.get('/updatepoint/:id', (req, res) => {});
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  (req, res) => {}
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  (req, res) => {}
);
router.delete('/updatepoint/:id', (req, res) => {});

export default router;
