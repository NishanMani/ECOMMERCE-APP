import express from 'express'
import { protect, adminOnly } from '../middlewares/auth.middleware.js'
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()

router.post('/create',createProduct)
router.get('/', getProducts)
router.get('/:id', getProductById)
router.put('/update/:id', protect, adminOnly, updateProduct)
router.delete('/delete/:id', protect, adminOnly, deleteProduct)

export default router