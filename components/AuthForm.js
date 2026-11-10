
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode = "login", admin = false }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (admin && mode === "register") {
        throw new Error("Admin registration is not allowed.");
      }

      const endpoint =
        mode === "register"
          ? "/api/auth/register"
          : "/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      if (mode === "register") {
        setMessage("Account created! Please sign in.");
        setTimeout(() => router.push("/login"), 1000);
      } else {
        router.push(data.redirect);
        router.refresh();
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          NIGHT<span>FALL</span>
          <small>RESORT & EXPERIENCE</small>
        </Link>

        <p className="auth-eyebrow">
          {admin ? "ADMINISTRATOR ACCESS" : "WELCOME TO NIGHTFALL"}
        </p>

        <h1>
          {mode === "register" ? "Create Account" : "Welcome Back"}
        </h1>

        <p className="auth-description">
          {mode === "register"
            ? "Create your account and begin planning your stay."
            : admin
            ? "Sign in to manage your hotel reservations."
            : "Sign in to continue to your Nightfall experience."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "register" && (
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email Address
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={mode === "register" ? 8 : undefined}
              required
            />
          </label>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <button className="auth-submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : mode === "register"
              ? "CREATE ACCOUNT"
              : "SIGN IN"}
          </button>
        </form>

        {!admin && (
          <p className="auth-switch">
            {mode === "register"
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <Link href={mode === "register" ? "/login" : "/register"}>
              {mode === "register" ? "Sign in" : "Create account"}
            </Link>
          </p>
        )}

        {!admin && (
          <Link href="/admin-login" className="admin-access-link">
            Administrator access
          </Link>
        )}

        <Link href="/" className="auth-back">
          ← Back to Nightfall Resort
        </Link>
      </div>
    </main>
  );
}
