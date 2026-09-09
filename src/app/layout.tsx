import type { Metadata, Viewport } from "next";
import dynamic from "next/dynamic";
import { Fraunces, Manrope, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { FloatingDocks } from "@/components/site/floating-dock";

/* On-demand chrome — both render nothing until opened, so their chunks
   (cmdk, dialog, the palette's icon set) load after first paint instead of
   blocking hydration on every page of the site. */
const CommandPalette = dynamic(() =>
  import("@/components/site/command-palette").then((m) => m.CommandPalette)
);
const ShortcutsDialog = dynamic(() =>
  import("@/components/site/shortcuts-dialog").then((m) => m.ShortcutsDialog)
);

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Newsreader — the editorial voice. Long-form reading, pull-quotes and ledes.
// A calmer serif than Fraunces at text sizes, so Fraunces stays purely display.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Placeholder domain pending school confirmation — makes relative OG URLs resolve.
const SITE_URL = "https://www.ersa.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "East Rand School of the Arts — A Gauteng School of Specialisation in the Arts",
    template: "%s — East Rand School of the Arts",
  },
  description:
    "ERSA is a public School of Specialisation in the Arts in Daveyton, Benoni. Five disciplines — Visual Arts, Design, Dramatic Arts, Dance Studies and Music — where East Rand talent becomes craft, confidence and opportunity.",
  keywords: [
    "East Rand School of the Arts",
    "ERSA",
    "School of Specialisation",
    "performing arts school Benoni",
    "arts school Daveyton",
    "Gauteng arts school",
    "Grade 8 auditions",
    "visual arts",
    "dramatic arts",
    "dance studies",
    "music",
    "design",
  ],
  authors: [{ name: "East Rand School of the Arts" }],
  openGraph: {
    title: "East Rand School of the Arts",
    description:
      "A public creative pipeline where East Rand talent becomes craft, confidence and opportunity.",
    siteName: "East Rand School of the Arts",
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    images: [
      {
        url: "/images/hero.webp",
        width: 1344,
        height: 768,
        alt: "A young dancer mid-leap under a golden spotlight on a dark stage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "East Rand School of the Arts",
    description:
      "A public creative pipeline where East Rand talent becomes craft, confidence and opportunity.",
    images: ["/images/hero.webp"],
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#161310",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${fraunces.variable} ${manrope.variable} ${geistMono.variable} ${newsreader.variable} flex min-h-screen flex-col antialiased bg-ink-950 text-paper`}
      >
        <ScrollProgress />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-[0.7rem] focus:font-bold focus:uppercase focus:tracking-[0.2em] focus:text-ink-950 focus:shadow-[0_10px_30px_-10px_rgba(212,175,55,0.6)] focus:outline-none"
        >
          Skip to content
        </a>
        {/* Global chrome shared by every page of the multipage site */}
        <header className="fixed inset-x-0 top-0 z-[80]">
          <AnnouncementBar />
          <Navbar />
        </header>
        {children}
        <Footer />
        <BackToTop />
        <FloatingDocks />
        <CommandPalette />
        <ShortcutsDialog />
        <Toaster />
      </body>
    </html>
  );
}
