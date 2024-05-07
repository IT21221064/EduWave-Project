import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import UploadCourse from "./pages/CoursePage/UploadCourse";
import CourseHome from "./pages/CourseHomePage/CourseHome";
import CourseAdmin from "./pages/CourseAdminPage/CourseAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/course-upload" element={<UploadCourse />} />
        <Route path="/course-home" element={<CourseHome />} />
        <Route path="/course-admin" element={<CourseAdmin />} />
       
      </Routes>
    </Router>
  );
}

export default App;
