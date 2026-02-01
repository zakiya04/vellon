import { model, Schema } from "mongoose";

const productSchema = new Schema({
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
    vendorId:{
        type: Schema.Types.ObjectId,
        ref: "Vendor"
    },
    price: {
        type: Number,
        required: true,
    }
},
{
    timestamps: true
})


export const Product = model("Product", productSchema)