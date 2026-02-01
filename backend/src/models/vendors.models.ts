import { model, Schema } from "mongoose";

const vendorSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true,
        lowercase: true,
        index: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    logoUrl:{
        type: String,
    },
    products:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
},
{
    timestamps: true
});

export const Vendors = model("Vendor", vendorSchema)