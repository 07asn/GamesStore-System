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

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <HomePage />
      <Footer />
    </>
  )
}

export default App
