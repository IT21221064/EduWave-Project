import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollPage from "./pages/EnrollPage/EnrollPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import Checkout from "./pages/PaymentPage/Checkout";
import MyPaymentsPage from "./pages/PaymentPage/MyPaymentsPage";
import GetAllPayments from "./pages/PaymentPage/GetAllPayments";

import LoginPage from "./pages/LoginPage/LoginPage";
import StuRegister from "./pages/SignupPage/StuRegister";
import StuLoginPage from "./pages/LoginPage/StuLogin";
import TutLoginPage from "./pages/LoginPage/TutLogin";
import TutRegister from "./pages/SignupPage/TutRegister";
import StuMyCourse from "./pages/EnrollPage/StuMyCourse";

import UploadCourse from "./pages/CoursePage/UploadCourse";
import CourseHome from "./pages/CourseHomePage/CourseHome";
import CourseAdmin from "./pages/CourseAdminPage/CourseAdmin";

import PaymentDetails from "./pages/PaymentPage/PaymentDetails";
import PaymentSuccessDetails from "./pages/PaymentPage/PaymentSuccessPage";
import AdminPaymentDetails from "./pages/PaymentPage/AdminPaymentDetails";

import CourseTutor from "./pages/CourseTutorPage/CourseTutor";

import WelcomePage from "./pages/SignupPage/WelcomePage";

import MyNotificationsPage from "./pages/NotificationPage/MyNotificationsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/enroll" element={<EnrollPage />} /> --
        <Route path="/payment" element={<PaymentPage />} /> --
        <Route path="/checkout" element={<Checkout />} /> --
        <Route path="/my-payments" element={<MyPaymentsPage />} /> --
        <Route path="/payment-details/:id" element={<PaymentDetails />} />
        --
        <Route path="/notify" element={<PaymentSuccessDetails />} /> --
        <Route
          path="/admin-payment-details/:id"
          element={<AdminPaymentDetails />}
        />
        --
        <Route path="/payments" element={<GetAllPayments />} />
        --
        <Route path="/" element={<WelcomePage />} /> --
        <Route path="/login" element={<LoginPage />} /> --
        <Route path="/register" element={<StuRegister />} /> --
        <Route path="/slogin" element={<StuLoginPage />} /> --
        <Route path="/tlogin" element={<TutLoginPage />} /> --
        <Route path="/tregister" element={<TutRegister />} /> --
        <Route path="/course-upload" element={<UploadCourse />} />
        <Route path="/course-home" element={<CourseHome />} /> --
        <Route path="/course-admin" element={<CourseAdmin />} />
        <Route path="/course-tutor" element={<CourseTutor />} />
        <Route path="/mystucourse" element={<StuMyCourse />} /> --
        <Route path="/my-notifications" element={<MyNotificationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
