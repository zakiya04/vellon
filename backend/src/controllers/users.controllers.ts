import { Request, Response } from "express";
import { IUser, User} from "../models/user.models";
import jwt from "jsonwebtoken"

interface authRequest extends Request{
    user?: IUser
}

export async function generateAccessAndRefreshToken(id: string):Promise<{accessToken:string, refreshToken:string}>{

  try {
    const user = await User.findById(id);
    if(!user) throw new Error("User does not exist!")

    const accessToken =  user.generateAccessToken();
    const refreshToken  =  user.generateRefreshToken();  
    return {accessToken, refreshToken}
  } catch (error) {
    throw error;
  }
}




export async function registerUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new Error("Enter Your Credentials!");
  }

  const existsUser = await User.findOne({ email });
  if (existsUser) throw new Error("User already exists!");

  const user = await User.create({ name, email, password });
  if (!user) throw new Error("Coulnt create user!");

  const createdUser = await User.findById(user._id).select("-password");
  return res.status(200).json({ message: "User created successfully!" });
}

export function getSuperAdmin() {

}

export async function loginUser(req: Request, res: Response,): Promise<Response> {
  const { name, email, password } = req.body;

  if (!name || !email || !password) throw new Error("Enter all inputs!");

  const doesUserExist = await User.findOne({ password, email });
  if (!doesUserExist) throw new Error("You need to register first!");

  const createdUser = await User.findById(doesUserExist._id).select(
    "-password",
  );

  return res.status(200).json({ message: "User logged in successfully!" });
}

export async function logOutUser( req: Request, res: Response,): Promise<Response> {
  await User.findByIdAndUpdate(req.body._id,
    {$unset: {refreshToken: undefined}},
    {new:true});
  
  const options ={
    httpOnly: true,
    secure: true
  }  
  return res.status(200)
}

export async function updateUser(req:authRequest, res:Response) {
  const {fullName, email} = req.body;
  if (!fullName || !email) throw new Error ("Input not applied properly!")
  
  const user = await User.findByIdAndUpdate(req.user?.id,{
    $set:{fullName, email}
  },{new:true}).select("-password -refreshToken");
  
  return res.status(200).json({message:"User Updated Successfully!"})
}

export function getOrders(req: authRequest, res:Response) {

}

export async function refreshAccessToken (req: Request, res: Response){
  try {
    const token = req.cookies?.refreshToken || req.headers?.refreshToken;
    if (!token) throw new Error("User never existed!");

    const decodedToken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET!)
    if(!decodedToken) throw new Error("token doesnt match!");

    if(typeof decodedToken !== "string"){
      const user = await User.findById(decodedToken?._id);

      if(!user) throw new Error ("User not authenticated!");
      
      if(token !== user.refreshToken) throw new Error ("token mismatched!");

      const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user.id);

      const options={
        httpsOnly: true,
        secure:true
      }
      
      return res.status(200)
      .cookie("accessToken",accessToken,options)
      .cookie("refreshToken",refreshToken, options)
      .json({accessToken,refreshToken})
    }
  
    
  } catch (error) {
    
  }
}

export function getUserProfile() {}

export function changePassword() {}



