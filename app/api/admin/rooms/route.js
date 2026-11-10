import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import Room from "@/models/Room";
import { ensureRooms } from "@/lib/roomData";
import mongoose from "mongoose";

async function checkAdmin() {
  const session = await getSession();
  return session?.role === "admin";
}

export async function GET() {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { message: "Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();
    await ensureRooms();

    const rooms = await Room.find().sort({ roomId: 1 });

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error("Admin rooms error:", error);

    return NextResponse.json(
      { message: "Could not load rooms." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    if (!(await checkAdmin())) {
      return NextResponse.json(
        { message: "Admin access required." },
        { status: 403 }
      );
    }

    const { roomId, available } = await request.json();

    if (
      typeof roomId !== "string" ||
      typeof available !== "boolean"
    ) {
      return NextResponse.json(
        { message: "Invalid room information." },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureRooms();

    const room = await Room.findOneAndUpdate(
      { roomId },
      { $set: { available } },
      { new: true }
    );

    if (!room) {
      return NextResponse.json(
        { message: "Room not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Room availability updated.",
      room,
    });
  } catch (error) {
    console.error("Update room error:", error);

    return NextResponse.json(
      { message: "Could not update room availability." },
      { status: 500 }
    );
  }
}