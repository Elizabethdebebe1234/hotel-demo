import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Room from "@/models/Room";
import { ensureRooms } from "@/lib/roomData";

export async function GET() {
  try {
    await connectDB();
    await ensureRooms();

    const rooms = await Room.find().sort({ roomId: 1 });

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error("Get rooms error:", error);

    return NextResponse.json(
      { message: "Could not load rooms." },
      { status: 500 }
    );
  }
}