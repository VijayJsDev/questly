import mongoose from 'mongoose';
import dns from 'node:dns';

// Ensure Windows local router DNS doesn't fail on Atlas SRV lookups
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if not permitted
}

export async function connectDB(): Promise<void> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI environment variable is missing in server/.env');
    return;
  }

  if (uri.includes('<db_username>')) {
    console.warn(
      '⚠️ Warning: MONGODB_URI still contains "<db_username>" placeholder. Please replace it with your actual MongoDB Atlas database username in server/.env'
    );
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
  }
}
