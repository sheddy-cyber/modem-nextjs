import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.modemcomputertechnology.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Computer Training Centre in Ibeju-Lekki, Lagos | Modem Computer Technology",
    template: "%s | Modem Computer Technology",
  },
  description:
    "Modem Computer Technology is a leading computer training centre in Ibeju-Lekki, Lagos. We offer web design, graphic design, computer maintenance, and sales of computers & accessories.",
  keywords: [
    "computer training Lagos",
    "web design training Ibeju-Lekki",
    "graphic design courses Lagos",
    "computer maintenance Lagos",
    "laptop sales Nigeria",
    "IT training Lagos",
  ],
  authors: [{ name: "Modem Computer Technology" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteUrl,
    siteName: "Modem Computer Technology",
    title: "Modem Computer Technology — Professional IT Training in Lagos",
    description:
      "Practical computer training, maintenance and procurement in Ibeju-Lekki, Lagos. Learn web design, graphic design, and more.",
    images: [{ url: "/images/computer_lab.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Modem Computer Technology — IT Training in Lagos",
    description: "Professional computer training in Ibeju-Lekki, Lagos",
    images: ["/images/computer_lab.jpg"],
  },
  icons: {
    icon: "/images/favicon-16x16.png",
    apple: "/images/logo1.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Modem Computer Technology",
    alternateName: "Modem Computer Training Centre",
    url: siteUrl,
    logo: `${siteUrl}/images/logo1.png`,
    image: `${siteUrl}/images/computer_lab.jpg`,
    description:
      "Leading computer training centre in Ibeju-Lekki, Lagos offering professional IT courses, computer maintenance, and equipment sales.",
    telephone: "+2348032310325",
    email: "modemcomputers247@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Elemoro Shopping Complex, Bogije Bus-stop",
      addressLocality: "Ibeju-Lekki",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.4698",
      longitude: "3.6408",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Training Courses",
      itemListElement: [
        {
          "@type": "Course",
          name: "Desktop Publishing",
          description: "Computer fundamentals, typing, MS Office suite training",
          provider: {
            "@type": "EducationalOrganization",
            name: "Modem Computer Technology",
          },
        },
        {
          "@type": "Course",
          name: "Digital Graphic Design",
          description: "CorelDraw, Adobe Photoshop training",
          provider: {
            "@type": "EducationalOrganization",
            name: "Modem Computer Technology",
          },
        },
        {
          "@type": "Course",
          name: "Frontend Web Design",
          description: "HTML, CSS, JavaScript web development training",
          provider: {
            "@type": "EducationalOrganization",
            name: "Modem Computer Technology",
          },
        },
      ],
    },
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${poppins.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
