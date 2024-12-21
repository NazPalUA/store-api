import 'dotenv/config';
import { MongoClient } from 'mongodb';

const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error('MONGODB_URI is not set');
}

const dbName = 'store-api';

const client = new MongoClient(url, {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
});

export async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.log('Please make sure MongoDB is running on your system');
    process.exit(1);
  }
}

export default client;
