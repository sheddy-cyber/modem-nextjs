"use client";

import { useEffect, useRef, useState } from "react";

interface StatProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      setDisplay(0);

      const STEPS = 60;
      const MS = 1600;
      let step = 0;

      timerRef.current = setInterval(() => {
        step++;
        const progress = 1 - Math.pow(1 - step / STEPS, 3); // ease-out cubic
        setDisplay(Math.round(progress * value));
        if (step >= STEPS) {
          setDisplay(value);
          if (timerRef.current) clearInterval(timerRef.current);
        }
      }, MS / STEPS);
    };

    // Fire after two animation frames to guarantee the element is painted and visible
    let raf1: number, raf2: number;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(run);
          });
          io.disconnect();
        }
      },
      { threshold: 0 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [value]);

  return (
    <div
      ref={wrapperRef}
      style={{ fontSize: "24px", fontWeight: 700, color: "#ffffff", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
    >
      {display}{suffix}
    </div>
  );
}

export function StatBadge({ value, suffix, label, icon }: StatProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        background: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(4px)",
        borderRadius: "12px",
        padding: "12px 16px",
        flex: 1,
        minWidth: 0,
      }}
    >
      <div style={{ color: "#bfdbfe", flexShrink: 0 }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <Counter value={value} suffix={suffix} />
        <div style={{ fontSize: "11px", color: "#bfdbfe", marginTop: "2px", lineHeight: 1.3 }}>{label}</div>
      </div>
    </div>
  );
}
