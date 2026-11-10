"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ExploreMore, OfferCard } from "@/components/HotelUI";

const image = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />

        <div className="hero-content">
          <p className="eyebrow">{t("heroEyebrow")}</p>

          <h1>
            {t("heroTitle")}
            <br />
            <span>{t("heroHighlight")}</span>
          </h1>

          <p className="hero-description">
            {t("heroDescription")}
          </p>

          <div className="hero-buttons">
            <Link href="/experiences" className="gold-button">
              {t("exploreExperiences")} ↗
            </Link>

            <Link href="/rooms" className="outline-button">
              {t("discoverRooms")}
            </Link>
          </div>
        </div>

        <div className="hero-bottom">
          <span>{t("heroBottom")}</span>
          <span>01 — 05</span>
        </div>
      </section>

      <section className="intro section-padding">
        <div>
          <p className="eyebrow">{t("welcomeEyebrow")}</p>

          <h2>
            {t("welcomeTitle")}
            <br />
            <span>{t("welcomeHighlight")}</span>
          </h2>

          <p>{t("welcomeDescription")}</p>

          <Link href="/contact" className="text-link">
            {t("discoverStory")} ↗
          </Link>
        </div>

        <div className="intro-image">
          <img
            src={image("photo-1571896349842-33c89424de2d")}
            alt="Resort pool"
          />
        </div>
      </section>

      <section className="section-padding">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("privateEscape")}</p>
            <h2>
              {t("stayIn")} <span>{t("style")}</span>
            </h2>
          </div>

          <Link href="/rooms" className="text-link">
            {t("allRooms")} ↗
          </Link>
        </div>

        <div className="room-grid">
          <OfferCard
            image={image("photo-1611892440504-42a792e24d32")}
            category={t("signature")}
            title={t("signatureSuite")}
            description={t("signatureDescription")}
            price={`12,500 ETB${t("perNight")}`}
            href="/rooms"
          />

          <OfferCard
            image={image("photo-1616486338812-3dadae4b4ace")}
            category={t("premium")}
            title={t("royalResidence")}
            description={t("royalDescription")}
            price={`18,000 ETB${t("perNight")}`}
            href="/rooms"
          />

          <OfferCard
            image={image("photo-1616594039964-ae9021a400a0")}
            category={t("comfort")}
            title={t("classicEscape")}
            description={t("classicDescription")}
            price={`8,500 ETB${t("perNight")}`}
            href="/rooms"
          />
        </div>
      </section>

      <section className="booking-access">
  <p>YOUR NIGHTFALL EXPERIENCE STARTS HERE</p>
  <h2>READY FOR AN EXTRAORDINARY STAY?</h2>

  <div className="booking-access-buttons">
    <Link href="/rooms">EXPLORE OUR ROOMS</Link>
    <Link href="/register">CREATE ACCOUNT</Link>
    <Link href="/login">CUSTOMER SIGN IN</Link>
    <Link href="/admin-login">ADMIN ACCESS</Link>
  </div>
</section>

      <section className="dining section-padding">
        <div className="dining-photo">
          <img
            src={image("photo-1544025162-d76694265947")}
            alt="Grilled meat"
          />
        </div>

        <div className="dining-content">
          <p className="eyebrow">{t("diningEyebrow")}</p>

          <h2>
            {t("diningTitle")} <span>{t("diningHighlight")}</span>
          </h2>

          <p>{t("diningDescription")}</p>

          <Link href="/dining" className="gold-button">
            {t("exploreDining")} ↗
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("momentsEyebrow")}</p>
            <h2>
              {t("liveThe")} <span>{t("moment")}</span>
            </h2>
          </div>

          <Link href="/experiences" className="text-link">
            {t("allExperiences")} ↗
          </Link>
        </div>

        <div className="experience-grid">
          <OfferCard
            image={image("photo-1576013551627-0cc20b96c2a7")}
            category={t("dayExperience")}
            title={t("poolsideParadise")}
            description={t("poolDescription")}
            href="/experiences"
          />

          <OfferCard
            image={image("photo-1478131143081-80f7f84ca84d")}
            category={t("nightExperience")}
            title={t("campfire")}
            description={t("campfireDescription")}
            href="/experiences"
          />
        </div>
      </section>

      

      <ExploreMore exclude="/" />
    </main>
  );
}