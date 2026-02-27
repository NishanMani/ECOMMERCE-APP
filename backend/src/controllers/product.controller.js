import mongoose from 'mongoose'

export const createProduct = async (req,res) => {
    try{
        const { name, description, price, category, stock, imageUrl} = req.body
        await Product.create( name, description, price, category, stock, imageUrl)
    } catch {

    }
}