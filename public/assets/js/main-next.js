/**
 * iPortfolio template main script — Next.js variant.
 * Runs inits after dynamic load (window "load" may have already fired).
 */
(function () {
  "use strict";

  const headerToggleBtn = document.querySelector(".header-toggle");
  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  if (headerToggleBtn) {
    headerToggleBtn.addEventListener("click", headerToggle);
  }

  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show") && headerToggleBtn) {
        headerToggle();
      }
    });
  });

  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  const preloader = document.querySelector("#preloader");

  let scrollTop = document.querySelector(".scroll-top");
  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add("active") : scrollTop.classList.remove("active");
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function aosInit() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }

  const selectTyped = document.querySelector(".typed");
  if (selectTyped && typeof Typed !== "undefined") {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  if (typeof PureCounter !== "undefined") {
    new PureCounter();
  }

  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint === "undefined") return;
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function () {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  if (typeof GLightbox !== "undefined") {
    GLightbox({ selector: ".glightbox" });
  }

  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    if (typeof imagesLoaded !== "undefined" && typeof Isotope !== "undefined") {
      imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
        initIsotope = new Isotope(isotopeItem.querySelector(".isotope-container"), {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        });
      });
    }

    isotopeItem.querySelectorAll(".isotope-filters li").forEach(function (filters) {
      filters.addEventListener(
        "click",
        function () {
          if (!initIsotope) return;
          isotopeItem.querySelector(".isotope-filters .filter-active").classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          aosInit();
        },
        false
      );
    });
  });

  function initSwiper() {
    if (typeof Swiper === "undefined") return;
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let cfgEl = swiperElement.querySelector(".swiper-config");
      if (!cfgEl) return;
      let raw = (cfgEl.textContent || cfgEl.innerHTML || "").trim();
      let config = JSON.parse(raw);
      new Swiper(swiperElement, config);
    });
  }

  let navmenulinks = document.querySelectorAll(".navmenu a");
  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll(".navmenu a.active").forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }

  function onTemplateLoad() {
    if (preloader) preloader.remove();
    toggleScrollTop();
    aosInit();
    initSwiper();
    navmenuScrollspy();
    if (window.location.hash) {
      let el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(el).scrollMarginTop;
          window.scrollTo({
            top: el.offsetTop - parseInt(scrollMarginTop, 10),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }

  document.addEventListener("scroll", toggleScrollTop);
  document.addEventListener("scroll", navmenuScrollspy);

  if (document.readyState === "complete") {
    setTimeout(onTemplateLoad, 0);
  } else {
    window.addEventListener("load", onTemplateLoad);
  }
})();
