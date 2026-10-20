import app from "./src/app.js"
import connectToDb from "./src/config/database.js"
import "dotenv/config"

connectToDb()

app.listen(3000,()=>{
    console.log("server is running")
})