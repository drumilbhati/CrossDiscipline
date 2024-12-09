import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Map from './components/Map.jsx';
import EpsilonHomepage from './pages/user/HomePage.jsx';
import Login from './auth/Login.jsx';
import Signup from './auth/Signup.jsx';
import AdminLogin from './auth/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import UserProfile from './components/UserProfile.jsx';
import MemTiers from './pages/user/MemTiers.jsx';
import './App.css';
import EpsilonDonation from './pages/user/Donation.jsx';
import EpsilonTestimonials from './components/Testimonials.jsx';
import UserPage from './pages/user/UserPage.jsx';
import EpsilonEnquiryForm from './components/EnquiryForm.jsx';
import Quiz from './components/Quiz.jsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<EpsilonHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/map" element={<Map />} />
        <Route path="/membership-tiers" element={<MemTiers />} />
        <Route path="/Donation" element={<EpsilonDonation />} />
        <Route path='/Testimonials' element={<EpsilonTestimonials />}></Route>
        <Route path="/UserPage" element={<UserPage />}></Route>
        <Route path="/EnquiryForm" element={<EpsilonEnquiryForm />}></Route>
        <Route path='/Quiz' element={<Quiz />}></Route>
      </Routes>
    </>
  );
}