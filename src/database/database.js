import mongoose from 'mongoose'
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Database connection done")
    }catch(error) {
        console.log("Failed to connect Databese", error)
        process.exit(1)
    }
}
export default connectDB