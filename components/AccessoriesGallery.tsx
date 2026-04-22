"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Grid3x3,
  Laptop,
  Keyboard,
  Monitor,
  Network,
  HardDrive,
  Package,
  PlusCircle,
  CheckCircle,
  X,
  Phone,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import {
  accessories,
  categoryLabels,
  type Category,
  type AccessoryItem,
} from "@/lib/accessories-data";

const ITEMS_PER_PAGE = 12;

const CATEGORY_KEYS: Category[] = [
  "all",
  "laptops",
  "keyboards",
  "monitors",
  "cables",
  "storage",
  "accessories",
];

function CategoryIcon({ cat }: { cat: Category }) {
  const cls = "w-4 h-4 shrink-0";
  if (cat === "all")          return <Grid3x3 className={cls} />;
  if (cat === "laptops")      return <Laptop className={cls} />;
  if (cat === "keyboards")    return <Keyboard className={cls} />;
  if (cat === "monitors")     return <Monitor className={cls} />;
  if (cat === "cables")       return <Network className={cls} />;
  if (cat === "storage")      return <HardDrive className={cls} />;
  if (cat === "accessories")  return <Package className={cls} />;
  return null;
}

export default function AccessoriesGallery() {
  const [filter, setFilter]     = useState<Category>("all");
  const [page, setPage]         = useState<number>(1);
  const [selected, setSelected] = useState<AccessoryItem | null>(null);
  const [filterTop, setFilterTop] = useState<number>(70);
  const headerRef = useRef<Element | null>(null);

  // Track the header height so the sticky filter bar sits just below it,
  // even when the header hides/shows on scroll.
  useEffect(() => {
    headerRef.current = document.querySelector(".site-header");

    const update = () => {
      const h = headerRef.current as HTMLElement | null;
      if (!h) { setFilterTop(0); return; }
      const hidden = h.classList.contains("hide-header");
      setFilterTop(hidden ? 0 : h.offsetHeight);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const filtered: AccessoryItem[] =
    filter === "all"
      ? accessories
      : accessories.filter((item) => item.category === filter);

  const total        = filtered.length;
  const visibleCount = page * ITEMS_PER_PAGE;
  const visible      = filtered.slice(0, visibleCount);
  const hasMore      = visibleCount < total;

  function handleFilter(cat: Category) {
    setFilter(cat);
    setPage(1);
  }

  return (
    <div>
      {/* Sticky wrapper — sticky only works within its parent.
          By closing this div before the CTA section, the filter bar
          naturally scrolls away when the grid ends. */}
      <div>
      {/* ── FILTER BAR ── */}
      <div
        className="filter-bar z-30 bg-white border-b border-slate-100 shadow-sm"
        style={{ position: "sticky", top: filterTop, transition: "top 0.3s ease" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="filter-scroll-row flex items-center gap-2 py-3 overflow-x-auto">
            {CATEGORY_KEYS.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleFilter(cat)}
                className={[
                  "inline-flex items-center gap-1.5 px-4 py-2 rounded-full",
                  "text-sm font-medium whitespace-nowrap shrink-0 border-0",
                  "transition-colors duration-150 cursor-pointer",
                  filter === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                ].join(" ")}
              >
                <CategoryIcon cat={cat} />
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── ITEM COUNT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <strong className="text-slate-800">{visible.length}</strong> of{" "}
          <strong className="text-slate-800">{total}</strong> items
          {filter !== "all" && (
            <>
              {" "}in{" "}
              <span className="text-blue-600 font-medium">
                {categoryLabels[filter]}
              </span>
            </>
          )}
        </p>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-slate-400 text-sm">
            No items found in this category.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {visible.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelected(item)}
                className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all duration-200 overflow-hidden text-left cursor-pointer p-0"
              >
                <div className="relative aspect-square bg-slate-50 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 18vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-800 leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  <span className="inline-block mt-1 text-[10px] text-slate-400 capitalize leading-none">
                    {categoryLabels[item.category]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── LOAD MORE ── */}
        <div className="flex justify-center mt-10">
          {hasMore ? (
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer border-0"
            >
              <PlusCircle className="w-[17px] h-[17px]" />
              Load More Items ({total - visible.length} remaining)
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-500 rounded-xl text-sm font-medium">
              <CheckCircle className="w-4 h-4 text-green-500" />
              All {total} items loaded
            </span>
          )}
        </div>
      </div>

      </div>{/* end sticky wrapper */}

      {/* ── READY TO PURCHASE CTA ── */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="flex items-start gap-5 text-white">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 mt-1">
                <ShoppingBag className="w-7 h-7 text-blue-300" />
              </div>
              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-2">
                  Ready to Make a Purchase?
                </h2>
                <p className="text-blue-200 max-w-lg leading-relaxed text-[15px]">
                  Contact us via phone or WhatsApp to enquire about pricing,
                  availability, and delivery. All products come with after-sales support.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <a
                href="tel:+2348032310325"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 whitespace-nowrap text-[15px]"
              >
                <Phone className="w-[17px] h-[17px]" />
                Call Us Now
              </a>
              <a
                href="https://wa.me/2348032310325?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 transition-all hover:scale-105 whitespace-nowrap text-[15px]"
              >
                <MessageCircle className="w-[17px] h-[17px]" />
                WhatsApp
              </a>
              <a
                href="/#contact"
                className="arrow-link inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all whitespace-nowrap text-[15px]"
              >
                Send Enquiry
                <span className="arrow-icon"><ArrowRight className="w-4 h-4" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT MODAL ── */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">

            {/* Image */}
            <div className="relative aspect-[4/3] bg-slate-50">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                className="object-contain p-4"
                sizes="500px"
              />
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors border-0 cursor-pointer"
              >
                <X className="w-[18px] h-[18px]" />
              </button>
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-1">
                {selected.name}
              </h3>
              <span className="text-sm text-slate-400 capitalize">
                {categoryLabels[selected.category]}
              </span>

              <div className="border-t border-slate-100 mt-4 pt-4">
                <p className="text-sm text-slate-500 mb-4">
                  Interested in this product?
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="tel:+2348032310325"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    <Phone className="w-[14px] h-[14px]" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/2348032310325?text=Hi%2C%20I%27m%20interested%20in%20${encodeURIComponent(selected.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl text-sm transition-colors"
                  >
                    <MessageCircle className="w-[14px] h-[14px]" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
