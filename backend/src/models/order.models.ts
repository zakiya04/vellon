import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    id :{
        type: String,
        required: true,
        index: true
    },
    productId:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    },
    vendorId:{
        type: Schema.Types.ObjectId,
        ref: "Vendors"
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    quantity:{
        type: Number,
        default: 1,
    },
    price:{
        type: Number,
        required: true
    },
    totalPrice:{
        type: Number,
        required: true
    }
},
    {timestamps: true}
)



export const Product = model("Product", orderSchema)