import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccessoriesGallery from "@/components/AccessoriesGallery";
import { accessories } from "@/lib/accessories-data";

export const metadata: Metadata = {
  title: "Computer Accessories & Laptops in Ibeju-Lekki, Lagos",
  description:
    "Buy laptops and computer accessories in Ibeju-Lekki, Lagos. We sell keyboards, mice, monitors, printers, cables, storage devices, and more with after-sales support.",
  alternates: { canonical: "/accessories" },
  openGraph: {
    title: "Computer Accessories & Laptops in Ibeju-Lekki, Lagos",
    description:
      "Browse and buy laptops, printers, and computer accessories from Modem Computer Technology in Ibeju-Lekki, Lagos.",
    images: ["/images/computer_lab.jpg"],
  },
};

export default function AccessoriesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "Modem Computer Technology - Accessories Store",
    url: "https://www.modemcomputertechnology.com/accessories",
    telephone: "+2348032310325",
    email: "modemcomputers247@gmail.com",
    description: `Computer accessories, laptops, and peripherals store in Ibeju-Lekki, Lagos. Over ${accessories.length} quality products available.`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Elemoro Shopping Complex, Bogije Bus-stop",
      addressLocality: "Ibeju-Lekki",
      addressRegion: "Lagos",
      addressCountry: "NG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main" className="pt-[70px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Page hero */}
        <section
          aria-labelledby="page-heading"
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-blue-300 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={15} /> Back to Home
            </Link>
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <ShoppingBag size={26} className="text-blue-300" />
              </div>
              <div>
                <h1 id="page-heading" className="font-heading text-3xl sm:text-4xl font-bold mb-2">
                  Laptops &amp; Computer Accessories Gallery
                </h1>
                <p className="text-blue-200 max-w-xl">
                  Explore our extensive collection of {accessories.length}+ quality products. Click any item to enquire via call or WhatsApp.
                </p>
              </div>
            </div>
          </div>
        </section>

        <AccessoriesGallery />
      </main>
      <Footer />
    </>
  );
}
