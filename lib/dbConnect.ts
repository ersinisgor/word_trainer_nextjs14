import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const dbConnect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("MongoDB connecting...");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "wordtrainer",
      bufferCommands: true,
    });
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error(error.message);
    throw new Error("Error: ", error);
  }
};

export default dbConnect;
