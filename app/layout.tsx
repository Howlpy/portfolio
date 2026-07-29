import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://howl.wtf"),
  title: "Adrian Gomez — Software Engineer",
  description: "Backend, IA, automatización y ciberseguridad. Sistemas y productos end-to-end desde Cartagena.",
  keywords: ["Adrian Gomez", "software engineer", "backend", "AI", "cybersecurity", "automation"],
  openGraph: {
    title: "Adrian Gomez — I build systems that think.",
    description: "Software engineer · Backend · IA · Automation · Cybersecurity",
    url: "https://howl.wtf",
    siteName: "Adrian Gomez",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
