import { IUser, User} from "../models/user.models";
import { Request, Response, NextFunction} from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface authRequest extends Request{
    user?: IUser
}

export const checkJwt = async (req:authRequest, res:Response, next: NextFunction)=>{
  
  try {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","");
  if(!token) throw new Error("Unauthorized User!");

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)as JwtPayload & { _id: string };
  const user = await User.findById(decodedToken._id).select("-password -refreshToken");
  if(!user) throw new Error("User doesnt exist!")

  req.user = user;
  next()

  } catch (err) {
    return res.status(500).json({message:"Could check for access-Token! ",err})
  }
  
}


export const protectedRoute = (req:authRequest, res:Response, next: NextFunction)=>{
  if(req.user && req.user.role == "admin") next();
  else{
    res.status(404);
    throw new Error("Only Admins are Allowed!")
  }
}