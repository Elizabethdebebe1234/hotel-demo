"use client";

import { useEffect, useState } from "react";

const statusLabels = {
  pending_payment_review: "Pending Payment Review",
  confirmed: "Confirmed",
  rejected: "Rejected",
  preparing: "Preparing",
  in_progress: "In Progress",
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

function formatMoney(amount) {
  return `${Number(amount || 0).toLocaleString()} ETB`;
}

export default function AdminDashboardClient({ adminName }) {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingBooking, setSavingBooking] = useState("");
  const [savingRoom, setSavingRoom] = useState("");
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [bookingResponse, roomResponse] = await Promise.all([
        fetch("/api/admin/bookings", { cache: "no-store" }),
        fetch("/api/admin/rooms", { cache: "no-store" }),
      ]);

      const bookingData = await bookingResponse.json();
      const roomData = await roomResponse.json();

      if (!bookingResponse.ok) {
        throw new Error(
          bookingData.message || "Could not load bookings."
        );
      }

      if (!roomResponse.ok) {
        throw new Error(
          roomData.message || "Could not load rooms."
        );
      }

      setBookings(bookingData.bookings || []);
      setRooms(roomData.rooms || []);

      const newDrafts = {};

      (bookingData.bookings || []).forEach((booking) => {
        newDrafts[booking._id] = {
          status: booking.status,
          message: booking.adminMessage || "",
        };
      });

      setDrafts(newDrafts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  function changeDraft(bookingId, field, value) {
    setDrafts((previous) => ({
      ...previous,
      [bookingId]: {
        ...previous[bookingId],
        [field]: value,
      },
    }));
  }

  async function updateBooking(bookingId) {
    try {
      setSavingBooking(bookingId);

      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId,
          status: drafts[bookingId].status,
          adminMessage: drafts[bookingId].message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking update failed.");
      }

      setBookings((previous) =>
        previous.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: result.booking.status,
                adminMessage: result.booking.adminMessage,
              }
            : booking
        )
      );

      alert("Booking updated successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setSavingBooking("");
    }
  }

  async function toggleRoom(room) {
    try {
      setSavingRoom(room.roomId);

      const response = await fetch("/api/admin/rooms", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: room.roomId,
          available: !room.available,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Room update failed.");
      }

      setRooms((previous) =>
        previous.map((item) =>
          item.roomId === room.roomId ? result.room : item
        )
      );
    } catch (error) {
      alert(error.message);
    } finally {
      setSavingRoom("");
    }
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending_payment_review"
  ).length;

  const availableRooms = rooms.filter(
    (room) => room.available
  ).length;

  if (loading) {
    return (
      <main className="admin-dashboard">
        <p className="admin-loading">Loading Nightfall management...</p>
      </main>
    );
  }

  return (
    <main className="admin-dashboard">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <p className="auth-eyebrow">NIGHTFALL MANAGEMENT</p>
            <h1>Administrator Dashboard</h1>
            <p>Welcome, {adminName || "Administrator"}.</p>
          </div>

          <form action="/api/auth/logout" method="POST">
            <button className="dashboard-logout">
              Sign Out
            </button>
          </form>
        </div>

        {error && <p className="admin-error">{error}</p>}

        {/* DASHBOARD STATISTICS */}
        <section className="admin-stats">
          <article className="admin-stat-card">
            <span>Total Reservations</span>
            <strong>{bookings.length}</strong>
          </article>

          <article className="admin-stat-card">
            <span>Payments to Review</span>
            <strong>{pendingBookings}</strong>
          </article>

          <article className="admin-stat-card">
            <span>Available Rooms</span>
            <strong>{availableRooms} / {rooms.length}</strong>
          </article>
        </section>

        {/* BOOKING MANAGEMENT */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <p className="rooms-eyebrow">CUSTOMER ORDERS</p>
              <h2>Reservations & Payment Verification</h2>
            </div>

            <button
              className="admin-refresh-button"
              onClick={loadDashboard}
            >
              Refresh
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="admin-empty">
              No reservations have been submitted yet.
            </div>
          ) : (
            <div className="admin-booking-list">
              {bookings.map((booking) => {
                const customer = booking.userId || {};
                const draft = drafts[booking._id] || {
                  status: booking.status,
                  message: booking.adminMessage || "",
                };

                return (
                  <article
                    className="admin-booking-card"
                    key={booking._id}
                  >
                    <div className="admin-booking-top">
                      <div>
                        <span className="admin-reference">
                          Booking #{booking._id.slice(-8)}
                        </span>
                        <h3>{booking.roomName}</h3>
                      </div>

                      <span
                        className={`admin-status status-${booking.status}`}
                      >
                        {statusLabels[booking.status] || booking.status}
                      </span>
                    </div>

                    <div className="admin-booking-details">
                      <div>
                        <span>Customer name</span>
                        <strong>{booking.guestName}</strong>
                      </div>

                      <div>
                        <span>Customer email</span>
                        <strong>{customer.email || "Not available"}</strong>
                      </div>

                      <div>
                        <span>Phone number</span>
                        <strong>{booking.phone}</strong>
                      </div>

                      <div>
                        <span>Room ID</span>
                        <strong>{booking.roomId}</strong>
                      </div>

                      <div>
                        <span>Check-in</span>
                        <strong>{formatDate(booking.checkIn)}</strong>
                      </div>

                      <div>
                        <span>Check-out</span>
                        <strong>{formatDate(booking.checkOut)}</strong>
                      </div>

                      <div>
                        <span>Number of nights</span>
                        <strong>{booking.nights}</strong>
                      </div>

                      <div>
                        <span>Price per night</span>
                        <strong>{formatMoney(booking.pricePerNight)}</strong>
                      </div>

                      <div>
                        <span>Total price</span>
                        <strong>{formatMoney(booking.totalPrice)}</strong>
                      </div>

                      <div>
                        <span>50% deposit</span>
                        <strong>{formatMoney(booking.depositAmount)}</strong>
                      </div>

                      <div>
                        <span>Payment method</span>
                        <strong>{booking.paymentMethod || "Telebirr"}</strong>
                      </div>

                      <div>
                        <span>Transaction reference</span>
                        <strong>{booking.transactionReference}</strong>
                      </div>
                    </div>

                    <div className="admin-payment-proof">
                      <h4>Customer Payment Screenshot</h4>

                      {booking.paymentScreenshot ? (
                        <a
                          href={booking.paymentScreenshot}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={booking.paymentScreenshot}
                            alt="Customer payment proof"
                          />
                          <span>Open full screenshot ↗</span>
                        </a>
                      ) : (
                        <p>No payment screenshot uploaded.</p>
                      )}
                    </div>

                    <div className="admin-decision">
                      <h4>Booking Decision</h4>

                      <label>Update booking status</label>

                      <select
                        value={draft.status}
                        onChange={(event) =>
                          changeDraft(
                            booking._id,
                            "status",
                            event.target.value
                          )
                        }
                      >
                        {Object.entries(statusLabels).map(
                          ([value, label]) => (
                            <option value={value} key={value}>
                              {label}
                            </option>
                          )
                        )}
                      </select>

                      <label>Message for the customer</label>

                      <textarea
                        value={draft.message}
                        onChange={(event) =>
                          changeDraft(
                            booking._id,
                            "message",
                            event.target.value
                          )
                        }
                        placeholder="Example: Your payment has been verified. Your reservation is confirmed."
                        rows={3}
                      />

                      <button
                        className="admin-save-button"
                        onClick={() => updateBooking(booking._id)}
                        disabled={savingBooking === booking._id}
                      >
                        {savingBooking === booking._id
                          ? "Saving..."
                          : "Save Booking Decision"}
                      </button>
                    </div>

                    <p className="admin-created-date">
                      Submitted: {formatDate(booking.createdAt)}
                    </p>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ROOM MANAGEMENT */}
        <section className="admin-section">
          <div className="admin-section-heading">
            <div>
              <p className="rooms-eyebrow">HOTEL INVENTORY</p>
              <h2>Room Availability Management</h2>
              <p>
                Make rooms available or hide them from customers.
              </p>
            </div>
          </div>

          <div className="admin-room-grid">
            {rooms.map((room) => (
              <article className="admin-room-card" key={room.roomId}>
                <div>
                  <span className="admin-reference">{room.roomId}</span>
                  <h3>{room.name}</h3>
                  <p>{room.beds}</p>
                  <strong>{formatMoney(room.price)} / night</strong>
                </div>

                <span
                  className={
                    room.available
                      ? "admin-room-status room-is-available"
                      : "admin-room-status room-is-unavailable"
                  }
                >
                  {room.available ? "Available" : "Unavailable"}
                </span>

                <button
                  className={
                    room.available
                      ? "room-toggle-button make-unavailable"
                      : "room-toggle-button make-available"
                  }
                  onClick={() => toggleRoom(room)}
                  disabled={savingRoom === room.roomId}
                >
                  {savingRoom === room.roomId
                    ? "Updating..."
                    : room.available
                      ? "Make Unavailable"
                      : "Make Available"}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}