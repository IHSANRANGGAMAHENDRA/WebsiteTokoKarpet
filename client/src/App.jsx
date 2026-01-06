import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import UserDashboard from './pages/UserDashboard';
import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';

import AdminOrders from './pages/AdminOrders';
import AdminCustomers from './pages/AdminCustomers';
import Settings from './pages/Settings';
import CustomerOrders from './pages/CustomerOrders';
import OrderDetail from './pages/OrderDetail';
import Wishlist from './pages/Wishlist';

import AdminLayout from './layouts/AdminLayout';
import CustomerLayout from './layouts/CustomerLayout';

import { WishlistProvider } from './context/WishlistContext';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <BrowserRouter>
          <CartDrawer /> {/* CartDrawer is still rendered globally */}
          <Routes>
            {/* A top-level route to wrap all other routes, if needed for shared context/components */}
            {/* For now, CartProvider and CartDrawer are outside Routes, as per original structure */}
            {/* Public Routes with Main Layout (Navbar + Footer) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="checkout" element={<Checkout />} />
            </Route>

            {/* Admin Routes with Admin Layout (Sidebar) */}
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="customers" element={<AdminCustomers />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Customer Routes with Customer Layout (Sidebar) */}
            <Route path="dashboard" element={<CustomerLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="orders/:id" element={<OrderDetail />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
