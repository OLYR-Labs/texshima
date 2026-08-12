"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="relative min-h-screen">
      {/* Application content */}
      <div
        className={`transition-all duration-300 ease-out ${
          isLoading
            ? "translate-y-1 opacity-90"
            : "translate-y-0 opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Full page loading screen */}
      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all duration-300 ${
          isLoading
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Blue gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.22),transparent_55%)]" />

        {/* Gradient glow */}
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        {/* Loading content */}
        <div
          className={`relative z-10 flex flex-col items-center transition-all duration-500 ${
            isLoading
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-4 scale-95 opacity-0"
          }`}
        >
          {/* TEXSHIMA logo */}
          <div className="select-none text-3xl font-black tracking-[-0.08em] text-white sm:text-4xl">
            TEXSHIMA
          </div>

          {/* Loading indicator */}
          <div className="mt-7 h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full origin-left animate-texshima-loading rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600" />
          </div>
        </div>
      </div>

      {/* Top loading line */}
      <div
        className={`pointer-events-none fixed left-0 top-0 z-[100000] h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 transition-all duration-300 ${
          isLoading
            ? "w-full opacity-100"
            : "w-0 opacity-0"
        }`}
      />
    </div>
  );
}