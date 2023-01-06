import { getUpdates, getOneUpdate, updateUpdate, createUpdate, deleteUpdate } from './handlers/update';
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

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
router.delete('/update/:id', deleteUpdate);

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

router.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).josn({ message: 'Unauthorized' });
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid input' });
  } else {
    res.status(500).json({ message: 'Internal error' });
  }
});

export default router;
