"use client";

import { useState, useRef } from "react";
import { Send, RotateCcw, User, Phone, Mail, BookOpen, MessageCircle, Loader2, CheckCircle, XCircle } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

const courses = [
  "Web Design & Development",
  "Desktop Publishing",
  "Digital Graphic Design",
  "Computer Maintenance & Repair",
  "Sales & Procurement",
  "Internship — Business Management",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [modal, setModal] = useState<{ type: "success" | "error"; name?: string; phone?: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setStatus("loading");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Submission failed");
      setModal({ type: "success", name: result.data?.name, phone: result.data?.phone });
      form.reset();
    } catch {
      setModal({ type: "error" });
    } finally {
      setStatus("idle");
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
  const labelCls = "flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wide";

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8"
      >
        <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-6">
          <MessageCircle size={20} className="text-blue-600" />
          Enquiry / Registration
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="name" className={labelCls}>
              <User size={12} /> Full name <span className="text-red-500">*</span>
            </label>
            <input id="name" name="name" type="text" placeholder="Enter your full name" required className={inputCls} />
          </div>

          <div>
            <label htmlFor="phone" className={labelCls}>
              <Phone size={12} /> Phone number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone" name="phone" type="tel" inputMode="tel"
              pattern="[\d\s\+\-\(\)]{6,}"
              placeholder="+234 803 231 0325" required className={inputCls}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelCls}>
              <Mail size={12} /> Email <span className="text-slate-400 font-normal normal-case">(optional)</span>
            </label>
            <input id="email" name="email" type="email" inputMode="email" placeholder="your.email@example.com" className={inputCls} />
          </div>

          <div>
            <label htmlFor="course" className={labelCls}>
              <BookOpen size={12} /> Area of enquiry
            </label>
            <select id="course" name="course" className={inputCls}>
              <option value="">Select a course</option>
              {courses.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="message" className={labelCls}>
              <MessageCircle size={12} /> Message
            </label>
            <textarea
              id="message" name="message" rows={5}
              placeholder="Any message or particular item of enquiry..."
              className={`${inputCls} resize-none`}
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md text-sm"
          >
            {status === "loading" ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Enquiry</>}
          </button>
          <button
            type="reset"
            className="px-5 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2"
          >
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </form>

      {/* Modal */}
      {modal && (
        <div
          role="dialog" aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setModal(null); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fade-up">
            {modal.type === "success" ? (
              <>
                <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Message Received!</h4>
                <p className="text-slate-500 mb-6 text-sm">
                  Thank you{modal.name ? `, ${modal.name}` : ""}! We&apos;ll contact you soon
                  {modal.phone ? ` at ${modal.phone}` : ""}.
                </p>
                <button onClick={() => setModal(null)} className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-sm">
                  Close
                </button>
              </>
            ) : (
              <>
                <XCircle size={52} className="text-red-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">Something Went Wrong</h4>
                <p className="text-slate-500 mb-6 text-sm">Please try again or contact us directly.</p>
                <button onClick={() => setModal(null)} className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors text-sm">
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
