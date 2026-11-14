import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!MONGODB_URL) {
    throw new Error("MISSING MONGODB_URL");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL, {
        dbName: "Cosmos-Queries",
        bufferCommands: false,
        connectTimeoutMS: 20000,
        socketTimeoutMS: 45000,
      })
      .then((mongooseInstance) => {
        console.log("Connected to Database");
        return mongooseInstance;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("Error during connection:", err);
    throw err;
  }
};
