"use client";

import { useEffect, useRef } from "react";

type Slide = { src: string; alt: string };

declare global {
  interface Window {
    Swiper?: new (el: HTMLElement, options: Record<string, unknown>) => { destroy: (a?: boolean, b?: boolean) => void };
  }
}

function slideSrc(im: Slide) {
  return im.src.startsWith("/") ? im.src : `/${im.src}`;
}

/**
 * Swiper rewrites the DOM inside its root. If React renders slides as children,
 * reconciliation clashes with Swiper and can throw removeChild errors.
 * We mount Swiper on markup built imperatively inside a host div React only owns as an empty shell.
 */
export function PortfolioDetailsSwiper({ images }: { images: Slide[] }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !images.length) return;

    let swiper: { destroy: (a?: boolean, b?: boolean) => void } | undefined;

    const build = () => {
      if (!window.Swiper || !host) return;

      host.innerHTML = "";

      const swiperEl = document.createElement("div");
      swiperEl.className = "portfolio-details-slider swiper";

      const wrapperEl = document.createElement("div");
      wrapperEl.className = "swiper-wrapper align-items-center";

      for (const im of images) {
        const slide = document.createElement("div");
        slide.className = "swiper-slide";
        const img = document.createElement("img");
        img.className = "img-fluid";
        img.src = slideSrc(im);
        img.alt = im.alt;
        slide.appendChild(img);
        wrapperEl.appendChild(slide);
      }

      const pag = document.createElement("div");
      pag.className = "swiper-pagination";

      swiperEl.appendChild(wrapperEl);
      swiperEl.appendChild(pag);
      host.appendChild(swiperEl);

      const multi = images.length > 1;
      swiper = new window.Swiper(swiperEl, {
        loop: multi,
        speed: 600,
        autoplay: multi ? { delay: 5000 } : false,
        slidesPerView: "auto",
        pagination: {
          el: pag,
          type: "bullets",
          clickable: true,
        },
      });
    };

    let cancelled = false;

    const runBuild = () => {
      if (cancelled) return;
      build();
    };

    if (window.Swiper) {
      runBuild();
    } else {
      window.addEventListener("iportfolio:ready", runBuild, { once: true });
    }

    return () => {
      cancelled = true;
      swiper?.destroy(true, true);
      swiper = undefined;
      host.innerHTML = "";
    };
  }, [images]);

  if (!images.length) {
    return (
      <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: 280 }}>
        <p className="text-muted mb-0 px-3 text-center">No images for this project.</p>
      </div>
    );
  }

  return <div ref={hostRef} className="portfolio-details-swiper-host" style={{ minHeight: 1 }} />;
}
