import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(
          `https://money-manager-ym1k.onrender.com/auth/verify-email?token=${token}`
        );
        const data = await res.json();

        if (res.ok) {
          setMessage("✅ Email verified successfully! You can now login.");
        } else {
          setMessage(`❌ ${data.error || "Verification failed."}`);
        }
      } catch (err) {
        setMessage("❌ Something went wrong. Please try again later.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setMessage("❌ No token provided in the URL.");
    }
  }, [token]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerificationPage;
