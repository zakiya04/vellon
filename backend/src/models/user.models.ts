import { model, Schema, Types} from "mongoose";
import bcrypt from "bcrypt";
import jwt, {Secret} from "jsonwebtoken"

export interface IUser {
    id: string
    name:string
    email:string
    role: string
    password: string
    refreshToken?: string
    orders?: Types.ObjectId[]

    generateAccessToken(): string
    generateRefreshToken(): string
}


const userSchema = new Schema<IUser>({
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
        default: "user"
    },
    password:{
        type: String,
        required: [true,"password....."],
    },
    refreshToken:{
        type: String,
        required: true
    },
    orders:[{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
},
{
    timestamps: true
});

userSchema.pre('save',async function () {
    if (!this.isModified('password'))  return

   this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.generateAccessToken = function(): string {
    
  return jwt.sign(
    { _id: this._id },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: "1d" }
  )
}

userSchema.methods.generateRefreshToken = async function(){
    
  return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET!,
    {expiresIn: "10d"})
}


export const User = model("User",userSchema)