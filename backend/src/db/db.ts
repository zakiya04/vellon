import mongoose from "mongoose";

const connectToDb = async ():Promise<void>=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/vellon`);
        console.log(`Connected to Mongoose at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Couldn't connect:", error);
        process.exit(1);
    }
}

export default connectToDb