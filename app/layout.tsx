import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://howl.wtf"),
  title: "Adrián Gómez — Software para problemas sin manual",
  description: "Backend, IA, automatización y ciberseguridad. Sistemas y productos end-to-end desde Cartagena.",
  keywords: ["Adrian Gomez", "software engineer", "backend", "AI", "cybersecurity", "automation"],
  openGraph: {
    title: "Adrián Gómez — Software para problemas sin manual",
    description: "Software engineer · Backend · IA · Automation · Cybersecurity",
    url: "https://howl.wtf",
    siteName: "Adrian Gomez",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og-v2.png", width: 1664, height: 936, alt: "Adrián Gómez — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Gómez — Software para problemas sin manual",
    description: "Backend · AI · Automation · CTI",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
