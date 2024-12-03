import dotEnv from "dotenv";
import { app } from "./app";
import dbConnect from "./db/dbConnect";

dotEnv.config({
    path: "./.env"
})

dbConnect()
 .then(()=>{
     console.log("Connected to the database!");
     app.listen(process.env.PORT || 5000, () => {
         console.log(`Server running on port ${process.env.PORT}`);
     });
     app.on("error",(error)=>{
         console.error("Server error:", error);
         process.exit(1);
     })
 })
 .catch(err => {
     console.error("Failed to connect to the database:", err);
     process.exit(1);
 }); 