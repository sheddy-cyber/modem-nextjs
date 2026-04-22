import Image from "next/image";
import Link from "next/link";
import {
  Award, GraduationCap, Calendar, MapPin, Phone, Mail, Clock,
  Monitor, UserCheck, Scroll,
  FileType, Palette, Code2, Building2, Wrench, Laptop,
  CalendarDays, Wallet, ArrowRight, Send, ExternalLink,
  Settings, ShoppingBag, Package, Check, Quote, User,
  ShieldCheck, TrendingUp, Star, Info, ShoppingCart,
  FileText, PlayCircle, Users, Briefcase,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ScrollAnimator from "@/components/ScrollAnimator";
import { StatBadge } from "@/components/StatsCounter";

const courses = [
  {
    icon: FileType,
    title: "Desktop Publishing",
    description: "Computer fundamentals, typing, MS Word, Excel, PowerPoint, Publisher and basic internet skills.",
    duration: "3 months",
    price: "₦90,000",
    featured: true,
  },
  {
    icon: Palette,
    title: "Digital Graphic Design",
    description: "CorelDraw, Corel Photo-Paint, Adobe Photoshop CC — print & digital file preparation.",
    duration: "3 months",
    price: "₦150,000",
  },
  {
    icon: Code2,
    title: "Frontend Web Design (Coding)",
    description: "HTML, CSS, JavaScript, React, responsive design, UI fundamentals and basic SEO for real projects.",
    duration: "3 – 4 months",
    price: "₦250,000",
  },
  {
    icon: Building2,
    title: "Internship — Business Management",
    description: "Work placement and business skills to support entrepreneurship and employment readiness.",
    duration: "5 months",
    price: "₦200,000",
  },
  {
    icon: Wrench,
    title: "Computer Maintenance & Repair",
    description: "Hardware diagnostics, troubleshooting, upgrades and preventive maintenance for PCs and laptops.",
    duration: "Variable",
    price: "Contact us",
  },
  {
    icon: Laptop,
    title: "Sales of Computers & Accessories",
    description: "We supply laptops, desktops and peripherals with manufacturer guidance and after-sales support.",
    duration: null,
    price: null,
  },
];

const features = [
  { icon: Monitor, title: "Conducive Learning Environment", desc: "Spacious classroom with real equipment and guided exercises." },
  { icon: UserCheck, title: "Experienced Tutors", desc: "Trainers with real-world industry experience." },
  { icon: Clock, title: "Flexible Schedules", desc: "Morning, evening and weekend classes to suit working learners." },
  { icon: Scroll, title: "Industry Certification", desc: "Recognised certificates upon course completion." },
];

const testimonials = [
  {
    quote: "The web development course transformed my career. Within 3 months of completing, I landed a job as a junior developer.",
    name: "Chidera O.",
    role: "Web Development Graduate",
  },
  {
    quote: "Professional tutors, modern equipment, and practical projects. Best training center in Ibeju-Lekki. Highly recommend!",
    name: "Itoje David",
    role: "Graphic Design Student",
  },
  {
    quote: "Started as a complete beginner and became inspired to pursue a career in Computer Science. The hands-on approach made all the difference.",
    name: "Chinonso Ewesiobi",
    role: "Desktop Publishing Alumni",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <ScrollAnimator />
      <main id="main" className="pt-[70px]">

        {/* ── HERO ── */}
        <section id="home" aria-labelledby="hero-heading"
          className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Left */}
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-blue-200">
                  <Award size={14} />
                  <span>Certified Training Center</span>
                </div>
                <h1 id="hero-heading" className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Build Real Skills.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">
                    Get Hired.
                  </span>{" "}
                  Start Your Tech Career.
                </h1>
                <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
                  Hands-on courses in desktop publishing, graphic design, web design, computer maintenance, and procurement of office equipment — delivered in Ibeju-Lekki, Lagos.
                </p>

                <div className="flex flex-wrap gap-3 mb-10">
                  <Link href="#courses"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105">
                    <GraduationCap size={18} />
                    Explore Courses
                  </Link>
                  <Link href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-sm transition-all">
                    <Calendar size={18} />
                    Book a Visit
                  </Link>
                </div>

                <ul className="space-y-3 text-sm text-blue-200">
                  <li className="flex items-start gap-2">
                    <MapPin size={15} className="shrink-0 mt-0.5 text-orange-400" />
                    <span><strong className="text-white">Location:</strong> Elemoro Shopping Complex, Bogije Bus-stop, Ibeju-Lekki, Lagos State, Nigeria.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={15} className="shrink-0 text-orange-400" />
                    <span><strong className="text-white">Tel:</strong>{" "}
                      <a href="tel:+2348032310325" className="hover:text-white transition-colors">+234 803 231 0325</a>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center gap-5">
                <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
                  <Image
                    src="/images/computer_lab.jpg"
                    alt="Modern computer lab with students learning at workstations"
                    width={600}
                    height={450}
                    className="w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>

                {/* Stats — below the image, full width */}
                <div className="flex gap-3 w-full">
                  <StatBadge value={200} suffix="+" label="Students Trained" icon={<Users size={20} />} />
                  <StatBadge value={100} suffix="%" label="Satisfied Students" icon={<Briefcase size={20} />} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" aria-labelledby="about-heading" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

              <div className="animate-on-scroll">
                <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">About Us</span>
                <h2 id="about-heading" className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-5">
                  Building Nigeria&apos;s Tech Workforce
                </h2>
                <p className="text-slate-500 leading-relaxed mb-8">
                  We deliver practical, job-ready training for individuals and organisations. Our instructors are industry practitioners who emphasise real-world projects, internships and post-training support.
                </p>

                <ul className="space-y-4 mb-8">
                  {features.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-blue-600" />
                      </div>
                      <div>
                        <strong className="text-slate-900 text-sm">{title}</strong>
                        <p className="text-slate-500 text-sm mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <a href="/docs/Course Outline.pdf" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  <FileText size={15} />
                  Download full course outline (PDF)
                </a>
              </div>

              <div className="animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <Image
                    src="/images/codescreen.jpeg"
                    alt="Computer lab training session showing code on screen"
                    width={600}
                    height={450}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <PlayCircle size={40} />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">
                  {[
                    { icon: ShieldCheck, label: "Accredited Center" },
                    { icon: TrendingUp, label: "15+ Years Experience" },
                  ].map(({ icon: Icon, label }) => (
                    <div key={label}
                      className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3 border border-slate-100">
                      <Icon size={18} className="text-blue-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COURSES ── */}
        <section id="courses" aria-labelledby="courses-heading"
          className="py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 animate-on-scroll">
              <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Our Programs</span>
              <h2 id="courses-heading" className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Courses &amp; Programmes
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Selected programmes — beginner to advanced. Full detailed syllabus available in the PDF.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => {
                const Icon = course.icon;
                return (
                  <article key={course.title}
                    className={`animate-on-scroll relative rounded-2xl p-7 border transition-all hover:shadow-xl hover:-translate-y-1 ${
                      course.featured
                        ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-500/20"
                        : "bg-white text-slate-900 border-slate-200 shadow-sm"
                    }`}
                    style={{ transitionDelay: `${i * 0.07}s` }}
                  >
                    {course.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        <Star size={10} fill="white" /> Most Popular
                      </div>
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      course.featured ? "bg-white/20" : "bg-blue-50"
                    }`}>
                      <Icon size={22} className={course.featured ? "text-white" : "text-blue-600"} />
                    </div>
                    <h3 className={`font-heading font-bold text-lg mb-2 ${course.featured ? "text-white" : "text-slate-900"}`}>
                      {course.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-5 ${course.featured ? "text-blue-100" : "text-slate-500"}`}>
                      {course.description}
                    </p>

                    <div className={`flex flex-wrap gap-3 mb-5 text-xs font-medium ${course.featured ? "text-blue-100" : "text-slate-500"}`}>
                      {course.duration && (
                        <span className={`flex items-center gap-1 ${course.featured ? "bg-white/15" : "bg-slate-100"} rounded-full px-3 py-1`}>
                          <CalendarDays size={11} /> {course.duration}
                        </span>
                      )}
                      {course.price && (
                        <span className={`flex items-center gap-1 ${course.featured ? "bg-white/15" : "bg-slate-100"} rounded-full px-3 py-1`}>
                          {course.price.startsWith("₦") ? <Wallet size={11} /> : <Info size={11} />} {course.price}
                        </span>
                      )}
                      {!course.price && (
                        <span className={`flex items-center gap-1 ${course.featured ? "bg-white/15" : "bg-slate-100"} rounded-full px-3 py-1`}>
                          <ShoppingCart size={11} /> Products available
                        </span>
                      )}
                    </div>

                    <Link href="#contact"
                      className={`arrow-link flex items-center gap-1 text-sm font-semibold transition-colors ${
                        course.featured ? "text-white hover:text-blue-100" : "text-blue-600 hover:text-blue-700"
                      }`}>
                      {course.price === "Contact us" ? "Learn more" : course.price ? "Enroll now" : "Get quote"}
                      <span className="arrow-icon"><ArrowRight size={14} /></span>
                    </Link>
                  </article>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-12 animate-on-scroll">
              <Link href="#contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all">
                <Send size={16} /> Register Now
              </Link>
              <a href="/docs/Course Outline.pdf" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                <ExternalLink size={15} /> View full syllabus
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" aria-labelledby="services-heading" className="py-20 lg:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 animate-on-scroll">
              <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Additional Services</span>
              <h2 id="services-heading" className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Beyond Training
              </h2>
              <p className="text-slate-500 max-w-md mx-auto">Comprehensive IT solutions for businesses and individuals</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Maintenance */}
              <div className="animate-on-scroll bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Settings size={22} className="text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Computer Maintenance &amp; Repair</h3>
                <p className="text-slate-500 text-sm mb-5">On-site and in-lab servicing for corporate clients and individuals.</p>
                <ul className="space-y-2">
                  {["Hardware diagnostics", "Software troubleshooting", "Preventive maintenance", "Software installation"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-green-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessories — featured */}
              <div className="animate-on-scroll relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-7 text-white shadow-xl shadow-blue-500/20 hover:shadow-2xl hover:-translate-y-1 transition-all" style={{ transitionDelay: "0.1s" }}>
                <span className="absolute top-4 right-4 text-xs font-bold bg-orange-400 text-white px-2.5 py-1 rounded-full">New</span>
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-5">
                  <ShoppingBag size={22} className="text-white" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">Laptops &amp; Computer Accessories</h3>
                <p className="text-blue-100 text-sm mb-5">Browse our extensive collection of 100+ quality products available for purchase.</p>
                <ul className="space-y-2 mb-6">
                  {["Laptops & Printers", "Keyboards & Mice", "Monitors & Displays", "Cables & Storage"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-blue-100">
                      <Check size={14} className="text-blue-200 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <Link href="/accessories"
                  className="arrow-link inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-100 transition-colors">
                  View Full Gallery <span className="arrow-icon"><ArrowRight size={14} /></span>
                </Link>
              </div>

              {/* Procurement */}
              <div className="animate-on-scroll bg-white rounded-2xl p-7 border border-slate-200 shadow-sm hover:shadow-lg transition-all" style={{ transitionDelay: "0.2s" }}>
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Package size={22} className="text-blue-600" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">Procurement of Office Equipment</h3>
                <p className="text-slate-500 text-sm mb-5">Office setup and procurement tailored to business budgets and compliance.</p>
                <ul className="space-y-2">
                  {["Bulk ordering", "Budget planning", "Installation support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check size={14} className="text-green-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section aria-labelledby="testimonials-heading" className="py-20 lg:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 animate-on-scroll">
              <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Success Stories</span>
              <h2 id="testimonials-heading" className="font-heading text-3xl sm:text-4xl font-bold text-slate-900">
                What Our Students Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.name}
                  className="animate-on-scroll bg-slate-50 rounded-2xl p-7 border border-slate-100 hover:shadow-lg transition-all"
                  style={{ transitionDelay: `${i * 0.1}s` }}>
                  <Quote size={28} className="text-blue-200 mb-4" />
                  <p className="text-slate-700 leading-relaxed mb-6 italic text-sm">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" aria-labelledby="contact-heading" className="py-20 lg:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Info */}
              <div className="animate-on-scroll">
                <span className="inline-block text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">Get In Touch</span>
                <h2 id="contact-heading" className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Contact &amp; Visit
                </h2>
                <p className="text-slate-500 mb-8">
                  <strong className="text-slate-700">Modem Computer Technology</strong><br />
                  Elemoro Shopping Complex, Bogije Bus-stop, Ibeju-Lekki, Lagos State, Nigeria.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    { icon: Phone, label: "Phone", content: <a href="tel:+2348032310325" className="text-blue-600 hover:underline font-medium">+234 803 231 0325</a> },
                    { icon: Mail, content: <a href="mailto:modemcomputers247@gmail.com" className="text-blue-600 hover:underline font-medium">modemcomputers247@gmail.com</a>, label: "Email" },
                    { icon: Clock, label: "Hours", content: <span className="font-medium text-slate-700">Mon–Sat: 9AM – 5PM</span> },
                  ].map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Icon size={17} className="text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-0.5">{label}</div>
                        <div className="text-sm">{content}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 h-64">
                  <iframe
                    title="Modem Computer Technology location on Google Maps"
                    src="https://www.google.com/maps?q=Elemoro+Shopping+Complex,+Bogije+Bus+stop+Ibeju-Lekki,+Lagos&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Form */}
              <div className="animate-on-scroll" style={{ transitionDelay: "0.15s" }}>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
