import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      bufferCommands: false,
    });
    console.log("db connected");
  } catch (error) {
    console.log("db error");
  }
};

export default connectDb;
