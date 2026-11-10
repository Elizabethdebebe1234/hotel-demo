"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PageHero, ExploreMore } from "@/components/HotelUI";

export default function Contact() {
  const { t } = useLanguage();

  const mapUrl =
    "https://maps.google.com/maps?q=Saris%2C%20Addis%20Ababa%2C%20Ethiopia&z=14&output=embed";

  const directionsUrl =
    "https://www.google.com/maps/search/?api=1&query=Saris%2C+Addis+Ababa%2C+Ethiopia";

  return (
    <main>
      <PageHero
        eyebrow={t("contactHeroEyebrow")}
        title={t("contactHeroTitle")}
        highlight={t("contactHeroHighlight")}
        description={t("contactHeroDescription")}
        image="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1800&q=85"
      />

      <section className="contact section-padding">
        <p className="eyebrow">{t("getInTouch")}</p>

        <h2>
          {t("storyStarts")} <span>{t("here")}</span>
        </h2>

        <p>{t("contactIntro")}</p>

        <div className="contact-grid">
          <article>
            <span>01 / {t("call")}</span>
            <h3>{t("phone")}</h3>
            <p>{t("phonePlaceholder")}</p>
          </article>

          <article>
            <span>02 / {t("write")}</span>
            <h3>{t("email")}</h3>
            <p>{t("emailPlaceholder")}</p>
          </article>

          <article>
            <span>03 / {t("visit")}</span>
            <h3>{t("location")}</h3>
            <p>{t("addressPlaceholder")}</p>
          </article>
        </div>

        <div className="contact-actions">
          <Link href="/rooms" className="gold-button">
            {t("exploreOurRooms")} ↗
          </Link>

          <Link href="/experiences" className="outline-button">
            {t("discoverEvents")}
          </Link>
        </div>

        <div className="location-section">
          <div className="location-heading">
            <p className="eyebrow">NIGHTFALL RESORT</p>
            <h2>
              {t("findUs")} <span>↗</span>
            </h2>
            <p>{t("mapDescription")}</p>
            <h3>{t("mapLabel")}</h3>
          </div>

          <div className="map-container">
            <iframe
              src={mapUrl}
              title="Nightfall Resort location in Saris, Addis Ababa"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-button map-directions"
          >
            {t("findUs")} ↗
          </a>
        </div>
      </section>

      <ExploreMore exclude="/contact" />
    </main>
  );
}