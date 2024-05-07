import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import StuRegister from "./pages/SignupPage/StuRegister";
import StuLoginPage from "./pages/LoginPage/StuLogin";
import TutLoginPage from "./pages/LoginPage/TutLogin";
import TutRegister from "./pages/SignupPage/TutRegister";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<StuRegister />} />
        <Route path="/slogin" element={<StuLoginPage />} />
        <Route path="/tlogin" element={<TutLoginPage />} />
        <Route path="/tregister" element={<TutRegister />} />
       
      </Routes>
    </Router>
  );
}

export default App;
