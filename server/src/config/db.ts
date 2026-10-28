import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('MongoDB URI nahi mila, bina DB ke chal raha hai');
      return;
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connect ho gaya: ' + conn.connection.host);
  } catch (error) {
    console.error('MongoDB connection error - bina DB ke chal raha hai');
    // Don't exit, allow server to run without DB for now
  }
};
