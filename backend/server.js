import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './src/config/db.js'
import authRoutes from './src/routes/auth.routes.js'

dotenv.config()
await connectDB()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/api/health', (_req, res) => {
    res.status(200).json({ success: true, message: 'Backend is running' })
})

app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen( PORT , () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
