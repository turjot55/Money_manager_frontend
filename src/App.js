import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EmailVerificationPage from "./components/verifyEmail/VerifyEmail";
import MainApp from "./components/MainApp/MainAppComponent";
import MeetingCalender from "./components/Calender/MeetingCalender";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "./UserContext";

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
        console.log("🧩 Decoded token:", decoded);

        // ✅ Check token expiration
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          const expiryTime = new Date(decoded.exp * 1000);
          console.log("✅ Login session ends at:", expiryTime.toLocaleString());

          setCurrentUser(decoded.username);
          setCurrentUserEmail(decoded.email);
        } else {
          console.warn("⚠️ Token expired or missing 'exp'. Logging out.");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, currentUserEmail }}>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/verify" element={<EmailVerificationPage />} />
        <Route
          path="/calendar"
          element={
            <div
              className="App"
              style={{ display: "grid", placeItems: "center" }}
            >
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
    </UserContext.Provider>
  );
};

export default App;
