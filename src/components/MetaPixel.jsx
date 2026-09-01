import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { COOKIE_CONSENT_EVENT, trackMetaPageView } from "../lib/metaPixel.js";

const MetaPixel = () => {
  const location = useLocation();

  useEffect(() => {
    trackMetaPageView();
  }, [location.pathname]);

  useEffect(() => {
    const trackAfterConsent = (event) => {
      if (event.detail === "accepted") trackMetaPageView();
    };

    window.addEventListener(COOKIE_CONSENT_EVENT, trackAfterConsent);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, trackAfterConsent);
  }, []);

  return null;
};

export default MetaPixel;
