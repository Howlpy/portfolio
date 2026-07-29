import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://howl.wtf"),
  title: "HOWL / Signal Core — Adrian Gomez",
  description: "Backend, IA, automatización y ciberseguridad. Sistemas y productos end-to-end desde Cartagena.",
  keywords: ["Adrian Gomez", "software engineer", "backend", "AI", "cybersecurity", "automation"],
  openGraph: {
    title: "HOWL / Signal Core — Adrian Gomez",
    description: "Software engineer · Backend · IA · Automation · Cybersecurity",
    url: "https://howl.wtf",
    siteName: "Adrian Gomez",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og.png", width: 1664, height: 936, alt: "HOWL / Signal Core — Adrian Gomez" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HOWL / Signal Core — Adrian Gomez",
    description: "Backend · AI · Automation · CTI",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
