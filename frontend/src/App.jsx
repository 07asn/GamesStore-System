import './App.css';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Wishlist from './components/Wishlist';
import Orders from './components/Orders';
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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ForgotPasswordForm from './pages/ForgotPasswordPage';
import ResetPasswordForm from './pages/ResetPasswordForm';
import OrderSummaryPage from './pages/OrderSummaryPage';
 
function App() {
  return (
    <Router>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account-details" element={<AccountDetails />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/order-summary" element={<OrderSummaryPage />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
