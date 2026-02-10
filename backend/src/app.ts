import express, {urlencoded} from "express";
import cors from "cors";
import cookieParser from "cookie-parser"


const app = express();

app.use(cors({origin:process.env.CORS_ORIGIN, credentials: true})); //for who can send data to backend
app.use(urlencoded({extended: true})) // can recieve html forms
app.use(cookieParser()) // parses cookie to json 
app.use(express.static("public")); //user can just grab img from public without making any particular route



import {userRouter} from "./routes/user.routes"
app.use("/api/v1/users", userRouter)


export default app