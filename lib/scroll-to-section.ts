"use client";

interface ScrollOptions {
  focus?: boolean;
}

export function scrollToSection(sectionId: string, options: ScrollOptions = {}) {
  if (typeof window === "undefined") return;

  const section = document.getElementById(sectionId);
  if (!section) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  section.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });

  if (!options.focus) return;

  const hadTabIndex = section.hasAttribute("tabindex");

  if (!hadTabIndex) {
    section.setAttribute("tabindex", "-1");
  }

  requestAnimationFrame(() => {
    section.focus({ preventScroll: true });

    if (!hadTabIndex) {
      section.addEventListener("blur", () => section.removeAttribute("tabindex"), {
        once: true,
      });
    }
  });
}
