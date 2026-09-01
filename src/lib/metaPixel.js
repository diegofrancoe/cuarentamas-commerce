export const COOKIE_CONSENT_KEY = "cm_cookies_choice";
export const COOKIE_CONSENT_EVENT = "cm:cookie-consent";

const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || "1343351624102596";
let initialized = false;

export const getCookieConsent = () => {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};

const installMetaQueue = () => {
  if (window.fbq) return;

  const fbq = (...args) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  };

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;
};

export const loadMetaPixel = () => {
  if (typeof window === "undefined" || getCookieConsent() !== "accepted") {
    return false;
  }

  installMetaQueue();

  if (!document.querySelector('script[data-cm-meta-pixel="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.dataset.cmMetaPixel = "true";
    document.head.appendChild(script);
  }

  if (!initialized) {
    window.fbq("init", META_PIXEL_ID);
    initialized = true;
  }

  return true;
};

export const trackMetaPageView = () => {
  if (loadMetaPixel()) window.fbq("track", "PageView");
};
