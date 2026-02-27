import express from 'express'
import { addToCart, getCart, updateCart, removeFromCart, removeAllCart } from '../controllers/cart.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/add', protect, addToCart)
router.get('/', protect , getCart)
router.put('/update/:id', protect, updateCart)
router.delete('/remove/:id', protect, removeFromCart)
router.delete('/clear', protect, removeAllCart)

export default router   