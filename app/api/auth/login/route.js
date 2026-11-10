import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Enter your email and password." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // ADMIN LOGIN
    if (
      normalizedEmail === process.env.ADMIN_EMAIL?.trim().toLowerCase() &&
      password === process.env.ADMIN_PASSWORD
    ) {
      await createSession({
        id: "nightfall-admin",
        name: "Nightfall Administrator",
        email: normalizedEmail,
        role: "admin",
      });

      return NextResponse.json({
        message: "Admin login successful!",
        redirect: "/admin",
      });
    }

    // CUSTOMER LOGIN
    await connectDB();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    await createSession({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: "customer",
    });

    return NextResponse.json({
      message: "Login successful!",
      redirect: "/customer",
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Login failed. Please try again." },
      { status: 500 }
    );
  }
}