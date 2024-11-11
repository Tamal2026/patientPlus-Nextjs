import { MongoClient } from "mongodb";

let client;
let clientPromise;
let db;

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

async function connectDB() {
  if (db) return db;

  if (!client) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }

  const connectedClient = await clientPromise;
  db = connectedClient.db(); 
  console.log("Connected to MongoDB");
  return db;
}

export { connectDB };
