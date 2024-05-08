import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

import LoginPage from "./pages/LoginPage/LoginPage";
import StuRegister from "./pages/SignupPage/StuRegister";
import StuLoginPage from "./pages/LoginPage/StuLogin";
import TutLoginPage from "./pages/LoginPage/TutLogin";
import TutRegister from "./pages/SignupPage/TutRegister";


import UploadCourse from "./pages/CoursePage/UploadCourse";
import CourseHome from "./pages/CourseHomePage/CourseHome";
import CourseAdmin from "./pages/CourseAdminPage/CourseAdmin";
import CourseTutor from "./pages/CourseTutorPage/CourseTutor";

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

        <Route path="/course-upload" element={<UploadCourse />} />
        <Route path="/course-home" element={<CourseHome />} />
        <Route path="/course-admin" element={<CourseAdmin />} />
        <Route path="/course-tutor" element={<CourseTutor />} />

       
      </Routes>
    </Router>
  );
}

export default App;
