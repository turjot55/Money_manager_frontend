import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import EmailVerificationPage from "./components/verifyEmail/VerifyEmail";
import MainApp from "./components/MainApp/MainAppComponent";
import MeetingCalender from "./components/Calender/MeetingCalender";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./UserContext";
import ResetPassword from "./components/ResetPass/ResetPassword";
import ErrorBoundary from "./components/ErrorBoundaries/ErrorBoundary";
import LandingPage from "./components/Landing/LandingPage";
// import Login from "./components/Auth/Login";
import LoginForm from "./Login/loginForm";
// import ForgotPasswordForm from "./components/ForgotPassword/ForgotPasswordForm";
import ForgotPasswordForm from "./components/ForgotPass/ForgotPass";


const App = () => {
  const [date, setDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          const expiryTime = new Date(decoded.exp * 1000);
          console.log("✅ Login session ends at:", expiryTime.toLocaleString());

          setCurrentUser(decoded.username);
          setCurrentUserEmail(decoded.email);
        } else {
          localStorage.removeItem("token");
        }
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white overflow-x-hidden">
      <ErrorBoundary>
        <UserContext.Provider value={{ currentUser, currentUserEmail }}>
          <div className="w-screen min-h-screen flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/dashboard" element={<MainApp />} />
              <Route path="/verify" element={<EmailVerificationPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route
                path="/calendar"
                element={
                  <div className="flex-1 flex items-center justify-center w-screen">
                    <MeetingCalender
                      date={date}
                      setDate={setDate}
                      selectRange={selectRange}
                      setSelectRange={setSelectRange}
                      currentUser={currentUser}
                    />
                  </div>
                }
              />
            </Routes>
          </div>
        </UserContext.Provider>
      </ErrorBoundary>
    </div>
  );
};

export default App;
