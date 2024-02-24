import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_LOCAL_URL;

if (!MONGODB_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

const connectDB = async () => {
  try {
    if (MONGODB_URL) {
      await mongoose.connect(MONGODB_URL, {
        ignoreUndefined: true,
      });
      console.log("successfully connected to mongodb");
    }
  } catch (error) {
    console.log(error);

    throw new Error("Error in connecting to mongodb");
  }
};

export default connectDB;
