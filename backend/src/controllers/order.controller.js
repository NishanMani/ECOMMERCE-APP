import Order from '../models/order.model.js'

export const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, status } = req.body

    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Order products are required' })
    }

    const order = await Order.create({
      userId: req.user._id,
      products,
      totalPrice,
      status
    })

    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('products.productId')
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    )

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json(order)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id })

    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}   