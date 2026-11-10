"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const links = [
  { key: "home", href: "/" },
  { key: "rooms", href: "/rooms" },
  { key: "dining", href: "/dining" },
  { key: "experiences", href: "/experiences" },
  { key: "contact", href: "/contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="site-header">
      <Link
        href="/"
        className="logo"
        onClick={() => setOpen(false)}
      >
        NIGHT<span>FALL</span>
        <small>{t("tagline")}</small>
      </Link>

      <button
        className="menu-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation"
        aria-expanded={open}
      >
        {open ? "✕" : "☰"}
      </button>

      <nav className={`site-nav ${open ? "nav-open" : ""}`}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={pathname === link.href ? "active-link" : ""}
          >
            {t(link.key)}
          </Link>
        ))}

        <Link href="/login" className="nav-book">
  BOOK A ROOM ↗
</Link>

<Link href="/register" className="nav-auth">
  CREATE ACCOUNT
</Link>

<Link href="/admin-login" className="nav-admin">
  ADMIN
</Link>

        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          aria-label={t("selectLanguage")}
        >
          <option value="EN">EN — English</option>
          <option value="AM">አማ — አማርኛ</option>
          <option value="OR">OR — Afaan Oromoo</option>
        </select>
      </nav>
    </header>
  );
}