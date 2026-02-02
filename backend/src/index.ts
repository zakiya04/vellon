import dotenv from "dotenv"
import connectToDb from "./db/db"
import app from "./app.js"

dotenv.config({
    path: "./.env"
})
connectToDb().then(()=>{
    app.listen(process.env.PORT) || 1010,()=>{
        console.log("Connected to server!!")
    }
}).catch(err => console.log("connection failed:", err));