import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_0.8fr_0.8fr_1.4fr] gap-y-10 gap-x-6 lg:gap-x-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/images/logo1.png" alt="Modem Computer Technology" width={44} height={38} className="rounded-lg brightness-90" />
              <span className="font-heading font-bold text-white text-sm leading-tight">
                Modem Computer<br />Technology
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Building Nigeria&apos;s tech workforce through practical, industry-focused training.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={`Follow us on ${label}`}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/#about", label: "About Us" },
                { href: "/#courses", label: "Courses" },
                { href: "/#services", label: "Services" },
                { href: "/accessories", label: "Accessories Gallery" },
                { href: "/#contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/docs/Course Outline.pdf", label: "Course Outline (PDF)", external: true },
                { href: "/#courses", label: "Admission" },
                { href: "/#contact", label: "Visit Location" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-400">
                <MapPin size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <span>Elemoro Shopping Complex, Bogije Bus-stop, Ibeju-Lekki, Lagos</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <a href="tel:+2348032310325" className="text-slate-400 hover:text-white transition-colors">
                  +234 803 231 0325
                </a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail size={15} className="shrink-0 mt-0.5 text-blue-400" />
                <a href="mailto:modemcomputers247@gmail.com" className="text-slate-400 hover:text-white transition-colors break-all">
                  modemcomputers247@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} <strong className="text-slate-400">Modem Computer Technology</strong>. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
