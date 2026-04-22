"use client";

import { useEffect } from "react";

export default function ScrollAnimator() {
  useEffect(() => {
    // Mark the page as JS-ready so CSS animations activate
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay to ensure all DOM elements are painted
    const timer = setTimeout(() => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return null;
}
