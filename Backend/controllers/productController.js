import productModel from "../models/ProductModel.js";
import fs from 'fs'

//add product item

const addProduct = async(req,res) => {
    let image_filename = `${req.file.filename}`

    const product = new productModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image:image_filename,
    })

    try{
        await product.save()
        res.json({sucess:true,message:"Product Addedd"})
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
};

//all product list
const listProduct = async(req,res) => {
    try {
        const products = await productModel.find({})
        res.json({sucess:true,data:products})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

//remove product item
const removeProduct = async(req,res) => {
    try {
       const product = await productModel.findById(req.body.id);
       fs.unlink(`uploads/${product.image}`,()=>{})

       await productModel.findByIdAndDelete(req.body.id); 
       res.json({sucess:true,message:"Product Removed"})
    } catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}

export {addProduct,listProduct,removeProduct}