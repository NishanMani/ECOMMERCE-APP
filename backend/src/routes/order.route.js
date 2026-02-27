import Order from '../models/order.model.js'

const router = express.Router()

router.post('/create', protect, createOrder)
router.get('/', protect, getOrders)
router.get('/:id', protect, getOrderById)
router.put('/update/:id', protect, updateOrder)
router.delete('/delete/:id', protect, deleteOrder)

export default router       