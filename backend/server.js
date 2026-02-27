import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.route.js'
import productRoutes from './src/routes/product.route.js'
import orderRoutes from './src/routes/order.route.js'
import userRoutes from './src/routes/user.route.js'

dotenv.config()
await connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen( PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
