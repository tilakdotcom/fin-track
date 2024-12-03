import dotEnv from "dotenv";
import { app } from "./app";
import dbConnect from "./db/dbConnect";

dotEnv.config({
    path: "./.env"
})

const port = process.env.PORT || 5000


dbConnect()
 .then(()=>{
     console.log("Connected to the database!");
     app.listen(port, () => {
         console.log(`Server running on port ${port}`);
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