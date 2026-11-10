
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const statusLabels = {
  pending_payment_review: "Payment Under Review",
  confirmed: "Reservation Confirmed",
  rejected: "Reservation Rejected",
  preparing: "Preparing Your Stay",
  in_progress: "Currently Staying",
  completed: "Stay Completed",
};

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
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

export default function CustomerReservations() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      try {
        const response = await fetch("/api/bookings", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load reservations.");
        }

        if (active) {
          setBookings(data.bookings || []);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err.message);
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
      <div className="dashboard-container">
        <Link href="/customer" className="reservation-back-link">
          ← BACK TO DASHBOARD
        </Link>

        <p className="auth-eyebrow">NIGHTFALL RESORT</p>
        <h1>My Reservations</h1>
        <p>Everything about your upcoming and previous stays.</p>

        {loading && <p>Loading your reservations...</p>}

        {error && (
          <p className="booking-error">{error}</p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <section className="empty-bookings">
            <h2>No reservations found</h2>
            <p>
              Your successfully submitted bookings will appear here.
            </p>
            <Link href="/rooms" className="dashboard-link">
              EXPLORE ROOMS →
            </Link>
          </section>
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
                    BOOKING #{booking._id.slice(-8).toUpperCase()}
                  </p>
                  <h2>{booking.roomName}</h2>
                  <p>{booking.guestName}</p>
                </div>

                <span className={`customer-status status-${booking.status}`}>
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
                  <span>Nights</span>
                  <strong>{booking.nights}</strong>
                </div>

                <div>
                  <span>Price per night</span>
                  <strong>{formatPrice(booking.pricePerNight)}</strong>
                </div>

                <div>
                  <span>Total amount</span>
                  <strong>{formatPrice(booking.totalPrice)}</strong>
                </div>

                <div>
                  <span>Deposit paid / submitted</span>
                  <strong>{formatPrice(booking.depositAmount)}</strong>
                </div>
              </div>

              <div className="customer-payment-details">
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p>
                  <strong>Payment reference:</strong>{" "}
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

              <div className="reservation-status-information">
                <h3>Reservation Update</h3>
                <p>
                  {booking.status === "pending_payment_review"
                    ? "Our team is reviewing your payment."
                    : booking.status === "confirmed"
                    ? "Your reservation has been confirmed. We look forward to welcoming you!"
                    : booking.status === "rejected"
                    ? "Your reservation was rejected. Please read the message from our team."
                    : booking.status === "preparing"
                    ? "We are preparing your room for your arrival."
                    : booking.status === "in_progress"
                    ? "Your stay is currently in progress. Enjoy your time with us!"
                    : booking.status === "completed"
                    ? "Your stay is complete. Thank you for choosing Nightfall Resort!"
                    : "Your reservation status has been updated."}
                </p>

                {booking.adminMessage && (
                  <div className="admin-customer-message">
                    <strong>Message from Nightfall Resort</strong>
                    <p>{booking.adminMessage}</p>
                  </div>
                )}
              </div>

              <p className="booking-submitted-date">
                Booking submitted: {formatDate(booking.createdAt)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
