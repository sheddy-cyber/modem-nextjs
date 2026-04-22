"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download, Menu, X, Phone, Mail, MapPin,
  Home, Info, GraduationCap, Wrench, ShoppingBag, MessageSquare,
} from "lucide-react";

const navLinks = [
  { href: "/#home",       label: "Home",        icon: Home },
  { href: "/#about",      label: "About",       icon: Info },
  { href: "/#courses",    label: "Courses",     icon: GraduationCap },
  { href: "/#services",   label: "Services",    icon: Wrench },
  { href: "/accessories", label: "Accessories", icon: ShoppingBag },
  { href: "/#contact",    label: "Contact",     icon: MessageSquare },
];

export default function Header() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const lastScrollY               = useRef(0);

  /* ── scroll behaviour ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > lastScrollY.current && y > 100);
      lastScrollY.current = y <= 0 ? 0 : y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── keyboard + body-scroll lock ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      {/* ── HEADER BAR ── */}
      <header
        role="banner"
        style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
        className={[
          "site-header fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm",
          scrolled ? "shadow-md" : "shadow-sm",
          hidden ? "-translate-y-full hide-header" : "translate-y-0",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={close}>
              <Image
                src="/images/logo1.png"
                alt="Modem Computer Technology Logo"
                width={52}
                height={46}
                className="rounded-lg"
                priority
              />
              <div>
                <div className="font-heading font-bold text-[13px] sm:text-[15px] text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">
                  Modem Computer Technology
                </div>
                <div className="hidden sm:block text-[10px] text-slate-500 font-medium tracking-wide">
                  IT Training · Maintenance · Sales · Procurement
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav aria-label="Main navigation" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href} className="px-3 py-2 text-sm font-medium text-slate-700 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href="/docs/Course Outline.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
              >
                <Download size={14} />
                <span>Course Outline</span>
              </a>

              {/* Hamburger — animates into X */}
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <span
                  className="absolute transition-all duration-300"
                  style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? "rotate(90deg) scale(0.5)" : "rotate(0deg) scale(1)" }}
                >
                  <Menu size={22} />
                </span>
                <span
                  className="absolute transition-all duration-300"
                  style={{ opacity: menuOpen ? 1 : 0, transform: menuOpen ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.5)" }}
                >
                  <X size={22} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── BACKDROP ── always in DOM, fades in/out */}
      <div
        aria-hidden="true"
        onClick={close}
        className="lg:hidden fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-[2px] transition-all duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      />

      {/* ── DRAWER ── slides in from right, always in DOM */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[78vw] max-w-[320px] bg-white shadow-2xl flex flex-col"
        style={{
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Drawer header — just the close button */}
        <div className="flex items-center justify-end px-4 py-3 border-b border-slate-100">
          <button
            onClick={close}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="space-y-1">
            {navLinks.map(({ href, label, icon: Icon }, i) => (
              <li
                key={href}
                style={{
                  transitionDelay: menuOpen ? `${i * 45}ms` : "0ms",
                  transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: "transform 0.3s ease, opacity 0.3s ease",
                }}
              >
                <Link
                  href={href}
                  onClick={close}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                    <Icon size={15} className="text-slate-500 group-hover:text-blue-600 transition-colors" />
                  </span>
                  <span className="font-medium text-sm">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-4 border-t border-slate-100" />

          {/* PDF download */}
          <a
            href="/docs/Course Outline.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 45}ms` : "0ms",
              transform: menuOpen ? "translateX(0)" : "translateX(24px)",
              opacity: menuOpen ? 1 : 0,
              transition: "transform 0.3s ease, opacity 0.3s ease",
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
              <Download size={15} className="text-blue-600" />
            </span>
            <div>
              <div className="font-semibold text-sm">Course Outline</div>
              <div className="text-[11px] text-blue-500">Download PDF</div>
            </div>
          </a>
        </nav>

        {/* Drawer footer — contact snapshot */}
        <div
          className="border-t border-slate-100 px-5 py-4 bg-slate-50 space-y-2.5"
          style={{
            transitionDelay: menuOpen ? `${(navLinks.length + 1) * 45}ms` : "0ms",
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            opacity: menuOpen ? 1 : 0,
            transition: "transform 0.3s ease, opacity 0.3s ease",
          }}
        >
          <a href="tel:+2348032310325" className="flex items-center gap-2.5 text-xs text-slate-500 hover:text-blue-600 transition-colors">
            <Phone size={13} className="text-blue-400 shrink-0" />
            +234 803 231 0325
          </a>
          <a href="mailto:modemcomputers247@gmail.com" className="flex items-center gap-2.5 text-xs text-slate-500 hover:text-blue-600 transition-colors break-all">
            <Mail size={13} className="text-blue-400 shrink-0" />
            modemcomputers247@gmail.com
          </a>
          <div className="flex items-start gap-2.5 text-xs text-slate-400">
            <MapPin size={13} className="text-blue-400 shrink-0 mt-0.5" />
            Elemoro Shopping Complex, Bogije, Ibeju-Lekki
          </div>
        </div>
      </div>
    </>
  );
}
