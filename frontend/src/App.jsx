// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Orders from './pages/Orders';
import AccountDetails from './pages/AccountDetailsPage';
import Cart from './pages/Cart';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmation from './pages/OrderConfirmation';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SupportPage from './pages/SupportPage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordForm from './pages/ForgotPasswordPage';
import ResetPasswordForm from './pages/ResetPasswordForm';
import OrderSummaryPage from './pages/OrderSummaryPage';
import Admin from './pages/Admin';
import TopPlayedGamesComponent from './pages/TopPlayedGamesComponent';
import { Toaster } from "react-hot-toast";
import VerifyEmail from './components/VerifyEmail';
import CookiesPolicy from './pages/CookiesPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';

const Layout = ({ children }) => {
  const location = useLocation();
  // Check if the path starts with "/admin" or is the reset password page
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isResetPasswordPage = location.pathname === '/reset-password';

  return (
    <>
      {!isAdminRoute && !isResetPasswordPage && <Navbar />}
      {children}
      {!isAdminRoute && !isResetPasswordPage && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<AccountDetails />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/orders/:id" element={<OrderSummaryPage />} />
          <Route path="/top-played" element={<TopPlayedGamesComponent />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/cookies" element={<CookiesPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about-us" element={<About />} />

        </Routes>
        <Toaster position="bottom-left" />
      </Layout>
    </Router>
  );
}

export default App;
