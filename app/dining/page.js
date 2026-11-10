
import Link from "next/link";
import { PageHero, OfferCard, ExploreMore } from "@/components/HotelUI";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

const dining = [
  ["photo-1544025162-d76694265947", "OPEN FIRE GRILL", "The Meat House", "Signature grilled meats, fresh cuts and bold flavors."],
  ["photo-1515003197210-e0cd7184f8b5", "AUTHENTIC ETHIOPIAN", "The Ethiopian Table", "Discover tibs, kitfo, traditional platters and more."],
  ["photo-1514933651103-005eec06c04b", "SIGNATURE LOUNGE", "The Night Lounge", "A sophisticated setting for drinks and conversations."],
  ["photo-1513558161293-cdaf765edfd4", "COFFEE & TRADITION", "The Buna Experience", "Traditional Ethiopian coffee and warm hospitality."]
];

export default function Dining() {
  return (
    <main>
      <PageHero
        eyebrow="02 / A FEAST FOR THE SENSES"
        title="FIRE. FLAVOR."
        highlight="FEAST."
        description="An extraordinary journey through Ethiopian cuisine, open-fire cooking and unforgettable drinks."
        image={img("photo-1544025162-d76694265947")}
      />

      <section className="section-padding">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FOOD, CULTURE & HOSPITALITY</p>
            <h2>EXPLORE OUR <span>TABLE.</span></h2>
          </div>
          <p>Every meal is an invitation to experience something special.</p>
        </div>

        <div className="room-grid">
          {dining.map((item) => (
            <OfferCard
              key={item[2]}
              image={img(item[0])}
              category={item[1]}
              title={item[2]}
              description={item[3]}
              href="/contact"
            />
          ))}
        </div>
      </section>

      <section className="dining section-padding">
        <div className="dining-photo">
          <img src={img("photo-1544025162-d76694265947")} alt="Grilled meat feast" />
        </div>
        <div className="dining-content">
          <p className="eyebrow">A NIGHT TO REMEMBER</p>
          <h2>THE GREAT <span>MEAT NIGHT.</span></h2>
          <p>
            Gather around incredible grilled meats, traditional
            Ethiopian dishes, music and unforgettable hospitality.
          </p>
          <Link href="/experiences" className="gold-button">DISCOVER MEAT NIGHTS ↗</Link>
        </div>
      </section>

      <ExploreMore exclude="/dining" />
    </main>
  );
}
