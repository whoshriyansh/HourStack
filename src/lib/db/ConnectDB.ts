import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    connection.isConnected = db.connections[0].readyState;

    console.log("DB is Successfully Connected");
  } catch (error) {
    console.log("Database Connection Failed", error);
    process.exit(1);
  }
}

export default dbConnect;
