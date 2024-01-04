import { connectMongoDB, disconnectMongoDB } from "@/lib/mongodb";

export async function POST(request) {
  try {
    await connectMongoDB();
  } catch (error) {
  } finally {
    await disconnectMongoDB();
  }
}
