import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true } )
        return res.json({ message: 'Profile updated successfully', user })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
} 