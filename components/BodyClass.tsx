"use client";

import { useEffect } from "react";

export function BodyClass({ className }: { className: string }) {
  useEffect(() => {
    const prev = document.body.className;
    document.body.className = className;
    return () => {
      document.body.className = prev;
    };
  }, [className]);
  return null;
}
