import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,  
        required: true
    },
    category: {
        type: String,
        enum: ['All', 'Men', 'Women', 'Kids', 'Accessories'],
        default: 'All',
        required: true
    },
    rating:{
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0          
    },
    imageUrl: {
        type: String
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL', 'XXL'],
        default: 'M'
    },
    color: {
        type: String,
        enum: ['Red', 'Blue', 'Green', 'Black', 'White', 'Yellow', 'Pink', 'Purple']
    },
    wishList: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);