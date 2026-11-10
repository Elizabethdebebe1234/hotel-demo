"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { PageHero, OfferCard, ExploreMore } from "@/components/HotelUI";

const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;

export default function Experiences() {
  const { t } = useLanguage();

  const events = [
    {
      image: "photo-1576013551627-0cc20b96c2a7",
      category: t("daytimeEscape"),
      title: t("poolsideParadise"),
      description: t("poolDescription"),
    },
    {
      image: "photo-1478131143081-80f7f84ca84d",
      category: t("underStars"),
      title: t("campfire"),
      description: t("campfireDescription"),
    },
    {
      image: "photo-1503095396549-807759245b35",
      category: t("liveEntertainment"),
      title: t("circusCelebration"),
      description: t("circusDescription"),
    },
    {
      image: "photo-1544025162-d76694265947",
      category: t("foodCulture"),
      title: t("meatNights"),
      description: t("meatDescription"),
    },
    {
      image: "photo-1511795409834-ef04bbd61622",
      category: t("specialOccasions"),
      title: t("privateCelebrations"),
      description: t("celebrationsDescription"),
    },
    {
      image: "photo-1516450360452-9312f5e86fc7",
      category: t("musicNightlife"),
      title: t("musicStars"),
      description: t("musicDescription"),
    },
  ];

  return (
    <main>
      <PageHero
        eyebrow={t("experiencesHeroEyebrow")}
        title={t("experiencesHeroTitle")}
        highlight={t("experiencesHeroHighlight")}
        description={t("experiencesHeroDescription")}
        image={img("photo-1478131143081-80f7f84ca84d")}
      />

      <section className="section-padding">
        <div className="section-heading">
          <div>
            <p className="eyebrow">{t("discoverExtraordinary")}</p>
            <h2>
              {t("eventsHeading")} <span>{t("eventsHighlight")}</span>
            </h2>
          </div>

          <p>{t("eventsIntro")}</p>
        </div>

        <div className="room-grid">
          {events.map((event) => (
            <OfferCard
              key={event.title}
              image={img(event.image)}
              category={event.category}
              title={event.title}
              description={event.description}
              href="/contact"
            />
          ))}
        </div>
      </section>

      <section className="night-banner">
        <div>
          <p className="eyebrow">{t("whenSunset")}</p>

          <h2>
            {t("nightYours")} <span>{t("yours")}</span>
          </h2>

          <p>{t("nightDescription")}</p>

          <Link href="/dining" className="gold-button">
            {t("nightDining")} ↗
          </Link>
        </div>
      </section>

      <ExploreMore exclude="/experiences" />
    </main>
  );
}