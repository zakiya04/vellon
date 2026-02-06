import { Request, Response } from "express";
import { Product } from "../models/product.models";
import {uploadOncloudinary, deleteFromCloudinary} from "../utils/cloudinary";

export async function getAllProducts(req:Request, res:Response){
    const page = Number (req.query.page) || 1;
    const limits = Number (req.query.limits) || 12;
    const skip = (page - 1) * limits;
    const sortBy = req.query.sortBy ? JSON.parse(req.query.sortBy as string) : {id:"", desc: false}
    let sort:any ={};

    if(sortBy.id) {sort[sortBy.id] = sortBy.desc ? -1 : 1}

    const totalProducts = await Product.countDocuments()
    const products = await Product.find().sort(sort).skip(skip).limit(limits);

    return res.status(200)
    .json(
        {success: true, products, totalProducts, pages: Math.ceil(totalProducts/limits), currentPage: page}
    )
}

export async function getOneProduct(req:Request, res:Response){
    const product = await Product.findById(req.params?._id);
    if(!product) return res.status(404).json({message:"Product not found!"})

    return res.status(200).json({success: true, product})
}

export async function createNewProduct(req:Request, res:Response){
  let imageUrl :{url:string, imageUrl:string} 
  const {name, description, price, category} = req.body;

  if(!name || !description  || !price || !category){
    return res.status(400).json({success: false, message: "Credentials not applied Properly!"})
  }
  if(req.file){
    imageUrl = await uploadOncloudinary(req.file.buffer,req.file.mimetype)
  }


  await Product.create({
    name,
    description,
    price,
    category,
    idOfImage:imageUrl!.imageUrl
  })
  return res.status(200).json({success: true, message: "Product created!"})
}


export async function UpdateNewProduct(req:Request, res:Response){
  try {
    let image :{url: string ; imageUrl: string}
    const id = req.params?.id;
    const  {name, description, price, category} = req.body;

    const product = await Product.findById(id)
    if(!product) throw new Error("Product not found!")

    if(req.file){
      if(product?.productImg){
        await deleteFromCloudinary(product?.productImg)
      }
      image = await uploadOncloudinary(req.file.buffer, req.file.mimetype);

      product.productImg = image.url
      product.idOfImage = image.imageUrl
    }

    if(name) product!.name = name;
    if(description) product!.description = description;
    if(price) product!.price = price;
    if(category) product!.category = category;

    const updatedProduct = await product.save();
    return res.status(200).json({success:true, message:"Updated Successfully!", updatedProduct})

  } catch (error) {
    return res.status(500).json({success:false, message:"Could not Update!"})
  }

}

export async function deleteProduct (req:Request, res:Response){
  const id = req.params?.id;
  if(!id) throw new Error("Did not get the product!")
  
  const product = await Product.findByIdAndDelete(id);
  if(!product) throw new Error("Product not find!")
  
  return res.status(200).json({success: true, product})  
}