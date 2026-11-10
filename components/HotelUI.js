"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function PageHero({ eyebrow, title, highlight, description, image }) {
  return (
    <section
      className="page-hero"
      style={{
        backgroundImage: `linear-gradient(90deg,#080808dd,#08080855),url("${image}")`,
      }}
    >
      <div className="page-hero-content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>
          {title} <span>{highlight}</span>
        </h1>
        <p>{description}</p>
      </div>

      <div className="page-hero-bottom">
        NIGHTFALL RESORT · ETHIOPIA
      </div>
    </section>
  );
}

export function ExploreMore({ exclude = "" }) {
  const { t } = useLanguage();

  const offers = [
    {
      name: t("luxuryRooms"),
      text: t("luxuryRoomsText"),
      href: "/rooms",
      image: "photo-1611892440504-42a792e24d32",
    },
    {
      name: t("diningBars"),
      text: t("diningBarsText"),
      href: "/dining",
      image: "photo-1544025162-d76694265947",
    },
    {
      name: t("experiences"),
      text: t("experiencesText"),
      href: "/experiences",
      image: "photo-1478131143081-80f7f84ca84d",
    },
    {
      name: t("contactUs"),
      text: t("contactText"),
      href: "/contact",
      image: "photo-1511818966892-d7d671e672a2",
    },
  ].filter((item) => item.href !== exclude);

  return (
    <section className="explore-section">
      <div className="explore-heading">
        <p className="eyebrow">{t("keepExploring")}</p>

        <h2>
          {t("moreTo")} <span>{t("discover")}</span>
        </h2>

        <p>{t("nextMoment")}</p>
      </div>

      <div className="explore-grid">
        {offers.map((offer, index) => (
          <Link
            href={offer.href}
            className="explore-card"
            key={offer.href}
          >
            <img
              src={`https://images.unsplash.com/${offer.image}?auto=format&fit=crop&w=700&q=85`}
              alt={offer.name}
            />

            <div className="explore-card-overlay">
              <small>
                0{index + 1} / {t("discoverLabel")}
              </small>

              <h3>{offer.name}</h3>
              <p>{offer.text}</p>
              <span>{t("explore")} ↗</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <Link href="/" className="logo">
        NIGHT<span>FALL</span>
        <small>{t("tagline")}</small>
      </Link>

      <div className="footer-links">
        <Link href="/">{t("home")}</Link>
        <Link href="/rooms">{t("rooms")}</Link>
        <Link href="/dining">{t("dining")}</Link>
        <Link href="/experiences">{t("experiences")}</Link>
        <Link href="/contact">{t("contact")}</Link>
      </div>

      <p>{t("footerTagline")}</p>
      <small>{t("copyright")}</small>
    </footer>
  );
}

export function OfferCard({
  image,
  category,
  title,
  description,
  price,
  href = "/contact",
}) {
  const { t } = useLanguage();

  return (
    <article className="offer-card">
      <Link href={href} className="offer-image">
        <img src={image} alt={title} />
        <span>{category}</span>
      </Link>

      <div className="offer-info">
        <h3>{title}</h3>
        <p>{description}</p>

        <div className="offer-bottom">
          <span>{price || t("discoverMore")}</span>
          <Link href={href}>{t("explore")} ↗</Link>
        </div>
      </div>
    </article>
  );
}