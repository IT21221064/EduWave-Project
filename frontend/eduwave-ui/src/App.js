import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
