
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const statusLabels = {
  pending_payment_review: "Pending Payment Review",
  confirmed: "Confirmed",
  rejected: "Rejected",
  preparing: "Preparing Your Stay",
  in_progress: "Stay In Progress",
  completed: "Completed",
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(price || 0);
}

export default function CustomerDashboardClient({ customerName }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      try {
        const response = await fetch("/api/bookings", {
          method: "GET",
          cache: "no-store",
        });

        const responseText = await response.text();
        const data = responseText ? JSON.parse(responseText) : {};

        if (!response.ok) {
          throw new Error(
            data.message || `Request failed: ${response.status}`
          );
        }

        if (active) {
          setBookings(data.bookings || []);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load reservations.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    const interval = setInterval(loadBookings, 5000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <main className="dashboard-page">
      <div className="dashboard-container customer-dashboard">

        <p className="auth-eyebrow">NIGHTFALL RESORT</p>

        <h1>Welcome, {customerName}</h1>
        <p>Manage your stay and reservations.</p>

        <Link
          href="/customer/reservations"
          className="dashboard-card reservation-dashboard-button"
        >
          <div>
            <p className="auth-eyebrow">YOUR BOOKINGS</p>
            <h2>My Reservations</h2>
            <p>View your rooms, payments and reservation status.</p>
          </div>

          <div className="reservation-button-bottom">
            <strong>{bookings.length} Reservation(s)</strong>
            <span>VIEW RESERVATIONS →</span>
          </div>
        </Link>

        <section className="dashboard-card">
          <h2>Find Your Room</h2>
          <p>Explore our four room collections.</p>
          <Link href="/rooms" className="dashboard-link">
            EXPLORE ROOMS →
          </Link>
        </section>

      </div>

      <section className="customer-bookings-section">
        <div className="customer-bookings-heading">
          <div>
            <p className="auth-eyebrow">YOUR STAYS</p>
            <h2>Reservation History</h2>
          </div>

          <span className="live-update-label">
            ● Live updates
          </span>
        </div>

        {loading && <p>Loading your reservations...</p>}

        {error && (
          <p className="booking-error">{error}</p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="empty-bookings">
            <h3>No reservations yet</h3>
            <p>Your submitted reservations will appear here.</p>
            <Link href="/rooms" className="dashboard-link">
              FIND YOUR ROOM →
            </Link>
          </div>
        )}

        <div className="customer-booking-list">
          {bookings.map((booking) => (
            <article
              className="customer-booking-card"
              key={booking._id}
            >
              <div className="customer-booking-top">
                <div>
                  <p className="booking-reference">
                    RESERVATION #{booking._id.slice(-8).toUpperCase()}
                  </p>

                  <h3>{booking.roomName}</h3>
                  <p>{booking.guestName}</p>
                </div>

                <span
                  className={`customer-status status-${booking.status}`}
                >
                  {statusLabels[booking.status] || booking.status}
                </span>
              </div>

              <div className="customer-booking-details">
                <div>
                  <span>Check-in</span>
                  <strong>{formatDate(booking.checkIn)}</strong>
                </div>

                <div>
                  <span>Check-out</span>
                  <strong>{formatDate(booking.checkOut)}</strong>
                </div>

                <div>
                  <span>Duration</span>
                  <strong>{booking.nights} Night(s)</strong>
                </div>

                <div>
                  <span>Price per night</span>
                  <strong>{formatPrice(booking.pricePerNight)}</strong>
                </div>

                <div>
                  <span>Total price</span>
                  <strong>{formatPrice(booking.totalPrice)}</strong>
                </div>

                <div>
                  <span>50% Deposit</span>
                  <strong>{formatPrice(booking.depositAmount)}</strong>
                </div>
              </div>

              <div className="customer-payment-details">
                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>

                <p>
                  <strong>Telebirr reference:</strong>{" "}
                  {booking.transactionReference}
                </p>

                {booking.paymentScreenshot && (
                  <div className="customer-payment-image">
                    <p>Payment screenshot</p>
                    <a
                      href={booking.paymentScreenshot}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={booking.paymentScreenshot}
                        alt="Payment screenshot"
                      />
                    </a>
                  </div>
                )}
              </div>

              {booking.adminMessage && (
                <div className="admin-customer-message">
                  <strong>Message from Nightfall Resort</strong>
                  <p>{booking.adminMessage}</p>
                </div>
              )}

              <p className="booking-submitted-date">
                Submitted: {formatDate(booking.createdAt)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <form action="/api/auth/logout" method="POST">
        <button className="dashboard-logout">
          Sign Out
        </button>
      </form>

    </main>
  );
}
