import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import { SiteFooter } from "@/components/HotelUI";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "Nightfall Resort | An Extraordinary Escape",
  description:
    "Luxury rooms, Ethiopian dining, bars, swimming and unforgettable resort experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}