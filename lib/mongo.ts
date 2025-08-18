import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

let cached = (global as any)._mongoose;
if (!cached) cached = (global as any)._mongoose = { conn: null, promise: null };
const RAW = process.env.MONGODB_URI!;
if (!/^mongodb(\+srv)?:\/\//.test(RAW)) {
  throw new Error("MONGODB_URI must start with mongodb:// or mongodb+srv://");
}

// Log what the app *actually* sees (masked). Works for mongodb+srv by swapping scheme to parse:
try {
  const u = new URL(RAW.replace(/^mongodb\+srv/, 'http'));
  console.log('[mongo] using', `mongodb+srv://${u.username}:***@${u.host}${u.pathname}${u.search}`);
} catch {
  console.log('[mongo] using (raw)', RAW.substring(0, 60) + '...');
}

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "store",
    }).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
