
"use client";

import { useEffect, useState } from "react";

const categories = [
  {
    id: "single",
    name: "Single Bedroom",
    description: "A stylish private retreat with one comfortable bed.",
    beds: "1 Bed",
    price: 2500,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu2VI7U0PDEWJnHonynRWNbRF5l6HoOIXRbesQKHJ6Q&s=10",
      "photo-1631049307264-da0ec9d70304",
      "photo-1616594039964-ae9021a400a0",
      "photo-1582719478250-c89cae4dc85b",
    ],
  },
  {
    id: "double",
    name: "Double Bedroom",
    description: "A spacious room with two comfortable beds.",
    beds: "2 Beds",
    price: 4000,
    images: [
      "photo-1590490360182-c33d57733427",
      "photo-1566665797739-1674de7a421a",
      "photo-1578683010236-d716f9a3f461",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuD4SEA1x4FXJguZfgeFDoa_-37Q--HT8rqesWsVNXQA&s=10",
    ],
  },
  {
    id: "premium",
    name: "Premium Bedroom",
    description: "An elegant luxury suite with premium furnishings.",
    beds: "1 King Bed",
    price: 6500,
    images: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
      "photo-1600210492486-724fe5c67fb0",
      "photo-1616486029423-aaa4789e8c9a",
    ],
  },
  {
    id: "family",
    name: "Family Bedroom",
    description: "A generous space designed for family comfort.",
    beds: "3 Beds",
    price: 8500,
    images: [
      "photo-1566665797739-1674de7a421a",
      "photo-1595576508898-0ad5c879a061",
      "photo-1578683010236-d716f9a3f461",
      "photo-1582719478250-c89cae4dc85b",
    ],
  },
];

const rooms = categories.flatMap((category) =>
  [1, 2, 3, 4].map((number) => ({
    id: `${category.id}-${number}`,
    categoryId: category.id,
    name: `${category.name} ${number}`,
    price: category.price,
    beds: category.beds,
    image: category.images[number - 1],
    available: true,
  }))
);

const imageUrl = (id) => {
  if (id.startsWith("http")) return id;

  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=90`;
};

export default function RoomsPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentStep, setPaymentStep] = useState(false);
  const [transactionReference, setTransactionReference] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
  setToday(new Date().toLocaleDateString("en-CA"));
}, []);

  // Room availability from MongoDB
  const [roomAvailability, setRoomAvailability] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  useEffect(() => {
    async function loadRoomAvailability() {
      try {
        const response = await fetch("/api/rooms", {
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Could not load rooms.");
        }

        const availability = {};

        result.rooms.forEach((room) => {
          availability[room.roomId] = room.available;
        });

        setRoomAvailability(availability);
      } catch (error) {
        console.error("Could not load room availability:", error);
      } finally {
        setAvailabilityLoading(false);
      }
    }

    loadRoomAvailability();
  }, []);

  
  const nights =
    checkIn && checkOut
      ? Math.max(
          0,
          Math.ceil(
            (new Date(checkOut) - new Date(checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const totalPrice = selectedRoom
    ? selectedRoom.price * nights
    : 0;

  const deposit = totalPrice * 0.5;

  // Hide rooms marked unavailable by admin
  const visibleRooms = rooms.filter((room) => {
    if (roomAvailability === null) return false;
    return roomAvailability[room.id] === true;
  });

  const categoryRooms = visibleRooms.filter(
    (room) => room.categoryId === selectedCategory?.id
  );

  function openBooking(room) {
    setSelectedRoom(room);
    setPaymentStep(false);
  }

  function closeBooking() {
    setSelectedRoom(null);
    setPaymentStep(false);
    setTransactionReference("");
    setScreenshot(null);
  }

  function handleBooking(event) {
    event.preventDefault();

    if (!checkIn || !checkOut || nights <= 0) {
      alert("Please select valid check-in and check-out dates.");
      return;
    }

    if (!guestName.trim() || !phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }

    setPaymentStep(true);
  }

  async function submitBooking(event) {
    event.preventDefault();

    if (!transactionReference.trim()) {
      alert("Please enter your Telebirr transaction reference.");
      return;
    }

    if (!screenshot) {
      alert("Please upload your payment screenshot.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("guestName", guestName.trim());
      formData.append("phone", phone.trim());
      formData.append("roomId", selectedRoom.id);
      formData.append("roomName", selectedRoom.name);
      formData.append("pricePerNight", selectedRoom.price);
      formData.append("checkIn", checkIn);
      formData.append("checkOut", checkOut);
      formData.append("nights", nights);
      formData.append("totalPrice", totalPrice);
      formData.append("depositAmount", deposit);
      formData.append("transactionReference", transactionReference.trim());
      formData.append("screenshot", screenshot);

      

      
const response = await fetch("/api/bookings", {
  method: "POST",
  body: formData,
});

const responseText = await response.text();

let data;

try {
  data = responseText ? JSON.parse(responseText) : {};
} catch {
  throw new Error(
    `Server returned an invalid response. HTTP ${response.status}`
  );
}

if (!response.ok) {
  throw new Error(data.message || "Booking submission failed.");
}

alert(data.message || "Your reservation was submitted successfully!");


      if (!response.ok) {
        throw new Error(result.message || "Booking submission failed.");
      }

      alert(
        "Your booking request was submitted successfully! The admin will review your payment."
      );

      setSelectedRoom(null);
      setPaymentStep(false);
      setGuestName("");
      setPhone("");
      setCheckIn("");
      setCheckOut("");
      setTransactionReference("");
      setScreenshot(null);

      window.location.href = "/customer";
    } catch (error) {
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="rooms-page">
      {/* PAGE HEADING */}
      <section className="rooms-heading">
        <p className="rooms-eyebrow">NIGHTFALL RESORT</p>
        <h1>Find Your Perfect Room</h1>
        <p>
          Discover your comfort. Choose your room and enjoy an
          unforgettable stay.
        </p>
      </section>

      {/* ROOM CATEGORIES */}
      {!selectedCategory ? (
        <section className="room-categories">
          <h2>Choose Your Room Type</h2>

          {availabilityLoading ? (
            <p>Checking room availability...</p>
          ) : (
            <div className="category-grid">
              {categories
                .filter((category) =>
                  visibleRooms.some(
                    (room) => room.categoryId === category.id
                  )
                )
                .map((category) => (
                  <article className="category-card" key={category.id}>
                    <img
                      src={imageUrl(category.images[0])}
                      alt={category.name}
                    />

                    <div className="category-content">
                      <span>{category.beds}</span>
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>

                      <div className="category-bottom">
                        <strong>
                          {category.price.toLocaleString()} ETB
                        </strong>

                        <button
                          onClick={() => setSelectedCategory(category)}
                        >
                          Explore Rooms →
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          )}

          {!availabilityLoading && visibleRooms.length === 0 && (
            <div className="admin-empty">
              All rooms are currently unavailable. Please check again later.
            </div>
          )}
        </section>
      ) : (
        <>
          {/* INDIVIDUAL ROOMS */}
          <section className="individual-rooms">
            <button
              className="back-rooms"
              onClick={() => setSelectedCategory(null)}
            >
              ← All Room Types
            </button>

            <div className="selected-heading">
              <p className="rooms-eyebrow">EXPLORE YOUR STAY</p>
              <h2>{selectedCategory.name}</h2>
              <p>{selectedCategory.description}</p>
            </div>

            {availabilityLoading ? (
              <p>Checking room availability...</p>
            ) : categoryRooms.length === 0 ? (
              <div className="admin-empty">
                Sorry, there are currently no available rooms in this category.
              </div>
            ) : (
              <div className="individual-room-grid">
                {categoryRooms.map((room) => (
                  <article
                    className="individual-room-card"
                    key={room.id}
                  >
                    <div className="room-image">
                      <img
                        src={imageUrl(room.image)}
                        alt={room.name}
                      />

                      <span className="available-label">
                        Available
                      </span>
                    </div>

                    <div className="individual-room-content">
                      <h3>{room.name}</h3>
                      <p>{room.beds} · Private bathroom · Wi-Fi</p>

                      <div className="room-price-row">
                        <strong>
                          {room.price.toLocaleString()} ETB
                        </strong>
                        <span>/ night</span>
                      </div>

                      <button
                        className="book-room-button"
                        onClick={() => openBooking(room)}
                      >
                        Book This Room
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="other-categories">
              <h3>Explore Other Room Types</h3>

              <div className="other-category-buttons">
                {categories
                  .filter(
                    (category) => category.id !== selectedCategory.id
                  )
                  .map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.name} →
                    </button>
                  ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* BOOKING MODAL */}
      {selectedRoom && (
        <div className="booking-overlay" onClick={closeBooking}>
          <div
            className="booking-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="booking-close"
              onClick={closeBooking}
              type="button"
            >
              ×
            </button>

            <p className="rooms-eyebrow">RESERVE YOUR STAY</p>
            <h2>{selectedRoom.name}</h2>

            <img
              className="booking-room-image"
              src={imageUrl(selectedRoom.image)}
              alt={selectedRoom.name}
            />

            {!paymentStep ? (
              <form onSubmit={handleBooking}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />

                <label>Phone Number</label>
                <input
                  type="tel"
                  placeholder="09XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <div className="booking-date-grid">
                  <div>
                    <label>Check-in</label>
                    <input
                      type="date"
                      min={today}
                      value={checkIn}
                      onChange={(e) => {
                        setCheckIn(e.target.value);

                        if (checkOut && checkOut <= e.target.value) {
                          setCheckOut("");
                        }
                      }}
                      required
                    />
                  </div>

                  <div>
                    <label>Check-out</label>
                    <input
                      type="date"
                      min={checkIn || today}
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="booking-summary">
                  <div>
                    <span>Price per night</span>
                    <strong>
                      {selectedRoom.price.toLocaleString()} ETB
                    </strong>
                  </div>

                  <div>
                    <span>Number of nights</span>
                    <strong>{nights}</strong>
                  </div>

                  <div>
                    <span>Total price</span>
                    <strong>{totalPrice.toLocaleString()} ETB</strong>
                  </div>

                  <div className="deposit-row">
                    <span>50% Deposit</span>
                    <strong>{deposit.toLocaleString()} ETB</strong>
                  </div>
                </div>

                <button className="book-room-button" type="submit">
                  Continue to Payment →
                </button>
              </form>
            ) : (
              <form onSubmit={submitBooking} className="payment-form">
                <h3>Complete Your Payment</h3>

                <p>
                  Please pay the 50% deposit of{" "}
                  <strong>{deposit.toLocaleString()} ETB</strong>{" "}
                  using Telebirr.
                </p>

                <div className="telebirr-payment-box">
                  <span>Nightfall Resort Telebirr Number</span>

                  <a
                    href="https://play.google.com/store/apps/details?id=cn.tydic.ethiopay"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telebirr-number-button"
                  >
                    <span>0942425447</span>
                    <span>Open Telebirr →</span>
                  </a>

                  <p>
                    Send the deposit to this number. Return here
                    afterward to upload your payment screenshot.
                  </p>
                </div>

                <label>Telebirr Transaction Reference</label>
                <input
                  type="text"
                  placeholder="Enter your transaction ID"
                  value={transactionReference}
                  onChange={(e) =>
                    setTransactionReference(e.target.value)
                  }
                  required
                />

                <label>Upload Payment Screenshot</label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) =>
                    setScreenshot(e.target.files?.[0] || null)
                  }
                  required
                />

                {screenshot && (
                  <p className="selected-file">
                    Selected: {screenshot.name}
                  </p>
                )}

                <div className="booking-summary">
                  <div>
                    <span>Amount to pay</span>
                    <strong>{deposit.toLocaleString()} ETB</strong>
                  </div>

                  <div>
                    <span>Remaining balance</span>
                    <strong>
                      {(totalPrice - deposit).toLocaleString()} ETB
                    </strong>
                  </div>
                </div>

                <button
                  className="book-room-button"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting..."
                    : "Submit Payment for Verification"}
                </button>

                <button
                  type="button"
                  className="back-rooms"
                  onClick={() => setPaymentStep(false)}
                >
                  ← Back to Booking Details
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
