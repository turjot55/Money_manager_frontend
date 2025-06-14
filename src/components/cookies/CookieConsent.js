import React, { useEffect, useState } from "react";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // For testing, let's force show the banner
    setShowBanner(true);
    console.log("CookieConsent mounted");
    
    const consent = localStorage.getItem("cookie_consent");
    console.log("Current consent value:", consent);
    
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (value) => {
    console.log("Setting consent to:", value);
    localStorage.setItem("cookie_consent", value);
    setShowBanner(false);
  };

  console.log("Current showBanner state:", showBanner);

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner" style={{ zIndex: 99999 }}>
      <div className="cookie-content">
        <h3>Cookie Notice</h3>
        <p>
          We use cookies to enhance your experience on our platform. Here's what we collect and why:
        </p>
        <ul>
          <li><strong>Authentication:</strong> To keep you logged in and secure</li>
          <li><strong>Preferences:</strong> To remember your settings and preferences</li>
          <li><strong>Analytics:</strong> To improve our service and user experience</li>
        </ul>
        <p>
          By clicking "Accept", you agree to our use of cookies. You can change your preferences anytime.
          For more details, please read our <a href="/privacy" className="privacy-link">Privacy Policy</a>.
        </p>
      </div>
      <div className="cookie-buttons">
        <button className="accept" onClick={() => handleConsent("accepted")}>
          Accept All
        </button>
        <button className="reject" onClick={() => handleConsent("rejected")}>
          Reject All
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
