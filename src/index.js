import app from './app.js'
import dotenv from 'dotenv'
import connectDB from './database/database.js'
dotenv.config({
    path: './.env'
});

const PORT = process.env.PORT || 5000;

app.get("/" , (req , res) => {
    res.end("<h1>Database connect with Docker</h1>")
})

connectDB()
    .then(() => {
        app.listen(PORT , () => {
            console.log(`App is running on PORT ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Mongodb connection error", error)
        process.exit(1)
    })
