import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "East Rand School of the Arts",
    short_name: "ERSA",
    description:
      "A public Gauteng School of Specialisation in the Arts in Daveyton, Benoni — Visual Arts, Design, Dramatic Arts, Dance Studies and Music.",
    start_url: "/",
    display: "standalone",
    background_color: "#161310",
    theme_color: "#161310",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    // Long-press app shortcuts (Android Chrome / desktop PWA installs).
    shortcuts: [
      {
        name: "Apply for 2027",
        short_name: "Apply",
        description: "Admissions steps, audition info and the enquiry form.",
        url: "/#/admissions",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "News & events",
        short_name: "Dates",
        description: "Festivals, showcases and audition windows.",
        url: "/#/events",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "The five disciplines",
        short_name: "Studios",
        description: "Visual Arts, Design, Dramatic Arts, Dance Studies, Music.",
        url: "/#/disciplines",
        icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }],
      },
    ],
  };
}
