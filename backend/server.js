import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoute from './src/routes/auth.route.js'
import productRoute from './src/routes/product.route.js'
import cartRoute from './src/routes/cart.route.js'
import orderRoute from './src/routes/order.route.js'

dotenv.config()
await connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', authRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orders', orderRoute)
    
const PORT = process.env.PORT || 5000

app.listen( PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
