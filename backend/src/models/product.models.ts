import { model, Schema } from "mongoose";

export interface Iproduct {
  id:string
  name:string
  description:string
  productImg: string
  vendorId?: string
  price: number
  category: string
  idOfImage: string
}

const productSchema = new Schema<Iproduct>({
    id:{
        type: String,
        required: true,
        index: true,
        unique: true 
    },
    name:{
        type: String,
        required: true,
        lowercase: true,

    },
    description:{
        type: String,
        required: true,
    },
    productImg:{
        type: String,
        required: true,
    },
    idOfImage:{
        type: String,
        required: true,
    },
    vendorId:{
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    price: {
        type: Number,
        required: true,
    },
    category:{
       type: String,
       required: true,
       lowercase: true
    }
},
{
    timestamps: true
})


export const Product = model("Product", productSchema)