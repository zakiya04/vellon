import { Request, Response } from "express";
import { User } from "../models/user.models";


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
  return res.status(200).json({message:"User created successfully!"})
}

export function createSuperAdmin() {}

export function loginUser() {}

export function logOutUser() {}

export function updateUser() {}

export function getOrders() {}

export function getUserProfile() {}

export function changePassword() {}

export function refreshToken() {}
