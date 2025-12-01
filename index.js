import { app } from "./app.js";
import { connectDB } from "./src/db/db.js";
import dotenv from "dotenv";

dotenv.config();


connectDB()
.then(()=>{
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, ()=>{
        console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
    })

    app.on('error', (err)=>{
        console.log(`UNABLE TO START THE SERVER: ${err.message}`);
        process.exit();
    });
   
})
.catch((err)=>{
    console.log(`UNABLE TO CONNECT TO DATABASE IN CATCH BLOCK: ${err.message}`);
    process.exit();
});