import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getSession } from "@/lib/auth";
import Booking from "@/models/Booking";
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

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);

    return NextResponse.json(
      { message: "Could not load bookings." },
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

    const { bookingId, status, adminMessage } =
      await request.json();

    const allowedStatuses = [
      "pending_payment_review",
      "confirmed",
      "rejected",
      "preparing",
      "in_progress",
      "completed",
    ];

    if (
      !mongoose.Types.ObjectId.isValid(bookingId) ||
      !allowedStatuses.includes(status) ||
      typeof adminMessage !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid booking update." },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      {
        $set: {
          status,
          adminMessage: adminMessage.trim(),
        },
      },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Booking updated successfully.",
      booking,
    });
  } catch (error) {
    console.error("Update booking error:", error);

    return NextResponse.json(
      { message: "Could not update booking." },
      { status: 500 }
    );
  }
}