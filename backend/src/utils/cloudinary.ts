import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
   cloud_name: process.env.CLOUD_NAME!,
   api_key: process.env.CLOUDINARY_API_KEY!,
   api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const uploadOncloudinary = async (buffer:Buffer,mimetype: string):Promise<{url:string, imageUrl: string}>=>{
  try {
   const b64 = buffer.toString('base64');
   if(!b64) throw new Error ("Buffer not found")

   const dataURI = `data:${mimetype};base64,${b64}`
   const result:any = await cloudinary.uploader.upload(dataURI,{resource_type:"auto"})
   return {url: result.secure_url, imageUrl: result.puclic_id}
  } catch (error) {

   throw new Error("Cloudinary Upload Failed!")
  }

}

const deleteFromCloudinary = async (id:string)=>{
 try {
  if(!id) throw new Error ("Image id is not provided!")
    await cloudinary.uploader.destroy(id)
 } catch (error) {
  throw error
 }
}

export {uploadOncloudinary, deleteFromCloudinary} 

