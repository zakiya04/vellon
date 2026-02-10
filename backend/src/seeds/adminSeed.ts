import { User } from "../models/user.models"

export const createAdmin = async ()=>{
  const exists = await User.findOne({role:"admin"});
  if(exists) return;

   User.create({
    name:"Admin",
    email: process.env.ADMIN_EMAIL!,
    role: "admin",
    password: process.env.ADMIN_PASSWORD!,
   })
}