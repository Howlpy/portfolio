import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://howl.wtf"),
  title: "Adrián Gómez — Software para problemas sin manual",
  description: "Software engineer y co-founder & CTO de Desmodus. Backend, IA, automatización y ciberseguridad: sistemas y productos end-to-end desde Cartagena.",
  keywords: ["Adrian Gomez", "software engineer", "Desmodus", "CTO", "backend", "AI", "cybersecurity", "automation"],
  openGraph: {
    title: "Adrián Gómez — Software para problemas sin manual",
    description: "Co-founder & CTO en Desmodus · Backend · IA · Automation · Cybersecurity",
    url: "https://howl.wtf",
    siteName: "Adrian Gomez",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1664, height: 936, alt: "Adrián Gómez — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Gómez — Software para problemas sin manual",
    description: "Co-founder & CTO en Desmodus · Backend · IA · Ciberseguridad",
    images: ["/og-v2.png"],
  },
};

export const viewport: Viewport = { themeColor: "#0e0d0b" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><head><link rel="preload" href="/fonts/instrument-serif-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/vt323-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="icon" href="/favicon.svg?v=5" type="image/svg+xml" /></head><body>{children}</body></html>;
}
