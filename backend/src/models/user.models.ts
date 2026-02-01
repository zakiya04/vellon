import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true
    },
    role:{
        type: String,
        required: [true,"Please enter your role"],
        default: true
    },
    password:{
        type: String,
        required: [true,"password....."],
    }
},
{
    timestamps: true
});

userSchema.pre('save',async function () {
    if (!this.isModified('password'))  return

   this.password = await bcrypt.hash(this.password,10);
})

export const User = model("User",userSchema)