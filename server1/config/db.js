import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://sdhanush129:Dhanush7382@cluster0.36aeb.mongodb.net/TaskManager?appName=Cluster0");
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

export default connectDB;
