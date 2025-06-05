import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB_URL");
  }

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "Cosmos-Queries",
    });
    isConnected = true;
    // console.log("Connected to Database");
  } catch (err) {
    console.log("Error during connection", err);
  }
};
