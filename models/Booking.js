import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    guestName: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    roomId: {
      type: String,
      required: true,
    },

    roomName: {
      type: String,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    nights: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    depositAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Telebirr",
    },

    paymentNumber: {
      type: String,
      default: "0942425447",
    },

    transactionReference: {
      type: String,
      required: true,
    },

    paymentScreenshot: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending_payment_review",
        "confirmed",
        "rejected",
        "preparing",
        "in_progress",
        "completed",
      ],
      default: "pending_payment_review",
    },

    adminMessage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);