import { connect } from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../config/config.env') });
const mongoConnectionString: string = process.env.MONGO_URI || '';
export const connectDB = async (): Promise<void> => {
  const conn = await connect(
    process.env.NODE_ENV === 'development'
      ? 'mongodb://localhost:27017'
      : mongoConnectionString
  );
  console.log(`MongoDB connected to ${conn.connection.name}`);
};
