"use client";

import { useEffect } from "react";

const VENDOR_SCRIPTS = [
  "/assets/vendor/bootstrap/js/bootstrap.bundle.min.js",
  "/assets/vendor/php-email-form/validate.js",
  "/assets/vendor/aos/aos.js",
  "/assets/vendor/typed.js/typed.umd.js",
  "/assets/vendor/purecounter/purecounter_vanilla.js",
  "/assets/vendor/waypoints/noframework.waypoints.js",
  "/assets/vendor/glightbox/js/glightbox.min.js",
  "/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js",
  "/assets/vendor/isotope-layout/isotope.pkgd.min.js",
  "/assets/vendor/swiper/swiper-bundle.min.js",
];

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(s);
  });
}

export function TemplateScriptLoader() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        for (const src of VENDOR_SCRIPTS) {
          if (cancelled) return;
          await loadScript(src);
        }
        if (cancelled) return;
        await loadScript("/assets/js/main-next.js");
        if (!cancelled) {
          window.dispatchEvent(new Event("iportfolio:ready"));
        }
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
