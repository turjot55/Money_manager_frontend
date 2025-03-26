import { Routes, Route } from "react-router-dom";
import EmailVerificationPage from "./components/verifyEmail/VerifyEmail";
import MainApp from "./components/MainApp/MainAppComponent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/verify" element={<EmailVerificationPage />} />
    </Routes>
  );
};

export default App;
