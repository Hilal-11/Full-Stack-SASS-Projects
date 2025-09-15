import express from "express";
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 4000
const app = express()


app.get("/api" , (req , res) => {
    return res.json({
        name: "Wasif Hilal Waseem",
        success:true
    })
})


app.get("/api/friend1" , (req , res) => {
    return res.json({
        name: "Waseem",
        success: true,
    })
})

app.get("/api/friend2" , (req , res) => {
    return res.json({
        name: "Wasif",
        success: true,
    })
})

app.listen(PORT , () => {
    console.log("App is running on port 3000")
})

