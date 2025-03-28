import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import EmailVerificationPage from "./components/verifyEmail/VerifyEmail";
import MainApp from "./components/MainApp/MainAppComponent";
import MeetingCalender from "./components/Calender/MeetingCalender";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [selectRange, setSelectRange] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setCurrentUser(decoded.username);
      } catch (err) {
        console.error("Invalid token in App:", err);
      }
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/verify" element={<EmailVerificationPage />} />
      <Route
        path="/calendar"
        element={
          <div className="App" style={{ display: "grid", placeItems: "center" }}>
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
  );
};

export default App;
