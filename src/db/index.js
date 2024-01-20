import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'


export const connectDB = async () =>{

    try{
         const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
         console.log(`\nMongoDB Connected !! DB HOST : ${connectionInstance.connection.host} `);
         console.log(`\n\nConetion : ${connectionInstance} `);

    }catch(error){
         console.log("MongoDB Connection error : " ,error );
         process.exit(1);
    }

    
    


}