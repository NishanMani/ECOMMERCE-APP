import express from 'express'
import { createOrder, getOrders, updateOrder, deleteOrder } from '../controllers/order.controller.js'
import { protect } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.post('/create', protect, createOrder)
router.get('/', protect, getOrders)
router.put('/update/:id', protect, updateOrder)
router.delete('/delete/:id', protect, deleteOrder)

export default router                   
