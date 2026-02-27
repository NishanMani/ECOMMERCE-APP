import Cart from '../models/cart.model.js'
import Product from '../models/product.model.js'

const calculateTotalPrice = async (products) => {
  let total = 0

  for (const item of products) {
    const product = await Product.findById(item.productId).select('price')
    if (product) {
      total += product.price * item.quantity
    }
  }

  return total
}

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body

    if (!productId) {
      return res.status(400).json({ message: 'productId is required' })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    let cart = await Cart.findOne({ userId: req.user._id })

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity, size, color }],
        totalPrice: product.price * quantity
      })

      return res.status(201).json(cart)
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    )

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity
      if (size) cart.products[existingProductIndex].size = size
      if (color) cart.products[existingProductIndex].color = color
    } else {
      cart.products.push({ productId, quantity, size, color })
    }

    cart.totalPrice = await calculateTotalPrice(cart.products)
    await cart.save()

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId')

    if (!cart) {
      return res.status(200).json({ userId: req.user._id, products: [], totalPrice: 0 })
    }

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateCart = async (req, res) => {
  try {
    const { quantity, size, color } = req.body

    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const item = cart.products.id(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' })
    }

    if (quantity !== undefined) item.quantity = quantity
    if (size !== undefined) item.size = size
    if (color !== undefined) item.color = color

    cart.totalPrice = await calculateTotalPrice(cart.products)
    await cart.save()

    res.status(200).json(cart)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    const item = cart.products.id(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Cart item not found' })
    }

    item.deleteOne()

    cart.totalPrice = await calculateTotalPrice(cart.products)
    await cart.save()

    res.status(200).json({ message: 'Item removed from cart', cart })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const removeAllCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    cart.products = []
    cart.totalPrice = 0
    await cart.save()

    res.status(200).json({ message: 'Cart cleared successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
