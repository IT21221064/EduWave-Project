import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/payment" element={<PaymentPage />} />
       
      </Routes>
    </Router>
  );
}

export default App;
