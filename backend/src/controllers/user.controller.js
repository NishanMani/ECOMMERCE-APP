import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const { name, email, password, address } = req.body

        if (name) user.name = name
        if (email) user.email = email
        if (address) user.address = address

        if (password) {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
        }

        await user.save()

        res.json({ message: 'Profile updated successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
} 