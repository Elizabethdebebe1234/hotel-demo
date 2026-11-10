
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Room from "@/models/Room";
import { ensureRooms } from "@/lib/roomData";

// GET: Retrieve the logged-in customer's reservations
export async function GET() {
  try {
    const session = await getSession();

    if (!session || session.role !== "customer" || !session.id) {
      return NextResponse.json(
        { message: "Please log in as a customer." },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(session.id)) {
      return NextResponse.json(
        { message: "Invalid customer session." },
        { status: 401 }
      );
    }

    await connectDB();

    const bookings = await Booking.find({
      userId: session.id,
    })
      .sort({ createdAt: -1 })
      .select("-__v")
      .lean();

    return NextResponse.json({
      bookings: bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
      })),
    });
  } catch (error) {
    console.error("GET bookings error:", error);

    return NextResponse.json(
      { message: "Could not load your reservations." },
      { status: 500 }
    );
  }
}

// POST: Submit a new reservation
export async function POST(request) {
  try {
    const session = await getSession();

    if (!session || session.role !== "customer" || !session.id) {
      return NextResponse.json(
        { message: "Please log in as a customer before booking." },
        { status: 401 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(session.id)) {
      return NextResponse.json(
        { message: "Invalid customer session." },
        { status: 401 }
      );
    }

    const formData = await request.formData();

    const guestName = formData.get("guestName");
    const phone = formData.get("phone");
    const roomId = formData.get("roomId");
    const roomName = formData.get("roomName");
    const pricePerNight = Number(formData.get("pricePerNight"));
    const checkIn = formData.get("checkIn");
    const checkOut = formData.get("checkOut");
    const nights = Number(formData.get("nights"));
    const totalPrice = Number(formData.get("totalPrice"));
    const depositAmount = Number(formData.get("depositAmount"));
    const transactionReference = formData.get("transactionReference");
    const screenshot = formData.get("screenshot");

    if (
      !guestName ||
      !phone ||
      !roomId ||
      !roomName ||
      !checkIn ||
      !checkOut ||
      !transactionReference ||
      !screenshot ||
      typeof screenshot === "string"
    ) {
      return NextResponse.json(
        { message: "Please complete all booking and payment fields." },
        { status: 400 }
      );
    }

    if (
      !Number.isFinite(pricePerNight) ||
      !Number.isFinite(nights) ||
      !Number.isFinite(totalPrice) ||
      !Number.isFinite(depositAmount) ||
      nights < 1 ||
      pricePerNight <= 0 ||
      totalPrice <= 0 ||
      depositAmount <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid booking information." },
        { status: 400 }
      );
    }

    const start = new Date(`${checkIn}T00:00:00.000Z`);
    const end = new Date(`${checkOut}T00:00:00.000Z`);

    const calculatedNights = Math.round(
      (end.getTime() - start.getTime()) / 86400000
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime()) ||
      calculatedNights < 1 ||
      calculatedNights !== nights ||
      totalPrice !== pricePerNight * nights ||
      depositAmount !== totalPrice * 0.5
    ) {
      return NextResponse.json(
        { message: "Your dates or payment calculation are invalid." },
        { status: 400 }
      );
    }

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(screenshot.type) ||
      screenshot.size > 4 * 1024 * 1024
    ) {
      return NextResponse.json(
        { message: "Upload a JPG, PNG, or WEBP screenshot under 4 MB." },
        { status: 400 }
      );
    }

    await connectDB();
    await ensureRooms();

    const databaseRoom = await Room.findOne({ roomId });

    if (!databaseRoom || !databaseRoom.available) {
      return NextResponse.json(
        { message: "Sorry, this room is currently unavailable." },
        { status: 409 }
      );
    }

    if (
      databaseRoom.name !== roomName ||
      databaseRoom.price !== pricePerNight
    ) {
      return NextResponse.json(
        { message: "Room information has changed. Please refresh." },
        { status: 409 }
      );
    }

    const conflictingBooking = await Booking.findOne({
      roomId,
      checkIn: { $lt: end },
      checkOut: { $gt: start },
      status: {
        $in: [
          "pending_payment_review",
          "confirmed",
          "preparing",
          "in_progress",
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          message: "This room already has a reservation for those dates.",
        },
        { status: 409 }
      );
    }

    const imageBuffer = Buffer.from(await screenshot.arrayBuffer());

    const imageData =
      `data:${screenshot.type};base64,${imageBuffer.toString("base64")}`;

    const booking = await Booking.create({
      userId: session.id,
      guestName: String(guestName).trim(),
      phone: String(phone).trim(),
      roomId: String(roomId),
      roomName: String(roomName),
      pricePerNight,
      checkIn: start,
      checkOut: end,
      nights,
      totalPrice,
      depositAmount,
      transactionReference: String(transactionReference).trim(),
      paymentScreenshot: imageData,
      status: "pending_payment_review",
    });

    return NextResponse.json(
      {
        message: "Your reservation was submitted successfully!",
        bookingId: booking._id.toString(),
        status: booking.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      { message: "Something went wrong while submitting your reservation." },
      { status: 500 }
    );
  }
}
