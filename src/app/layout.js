import { Providers } from "./providers";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Poppins } from "next/font/google";
export const metadata = {
  title: "SYL talento soluciones en reclutamiento y suministros en la baja.",
  description:
    "En SYL Talento, nos dedicamos a brindar soluciones de reclutamiento y selección de personal, así como suministros de materiales en Baja California y en toda la República Mexicana. Somos una empresa 100% comprometida con la innovación, la integridad y la calidad.",
  publisher: "Ecommetrica",
  authors: [{ name: "Ecommetrica", url: "https://e-commetrics.com/" }],
  keywords: [
    "Reclutamiento de personal",
    "publicar vacantes",
    "páginas de reclutamiento",
    "plataformas de empleo ",
  ],
  alternates: {
    canonical: "https://syltalento.com/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const font = Poppins({ subsets: ["latin"], weight: ["300"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>{children}</Providers>
        <GoogleTagManager gtmId="GTM-N6HSR8RW" />
        <GoogleAnalytics gaId="G-YC3STY07FX" />
      </body>
    </html>
  );
}
