import React, { useEffect, useState } from "react";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value) => {
    localStorage.setItem("cookie_consent", value);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <p>
        This website uses cookies to enhance user experience. Do you accept the
        use of cookies to store your information?
      </p>
      <div className="cookie-buttons">
        <button className="accept" onClick={() => handleConsent("accepted")}>
          Accept
        </button>
        <button className="reject" onClick={() => handleConsent("rejected")}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
