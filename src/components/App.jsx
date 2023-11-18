import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContexts';
import { QuantityProvider } from '../contexts/QuantityContext';

import Navbar from './main/Navbar';
import Homepage from './pages/home/Homepage';
import PrivateRoute from '../hooks/PrivateRoute';

const Collections = lazy(() => import('./pages/collections/CollectionsPage'));
const SneakerDetails = lazy(() =>
  import('./pages/sneakers/details/SneakerDetails')
);

const CartPage = lazy(() => import('./pages/cart/CartPage'));
const ContactsPage = lazy(() => import('./pages/contacts/ContactsPage'));
const CheckoutPage = lazy(() => import('./pages/cart/Checkout'));
const OrderInfo = lazy(() => import('./main/OrderInfo'));
const FAQPage = lazy(() => import('./pages/faq/FAQ'));

const Dashboard = lazy(() => import('./main/Dashboard'));
const Login = lazy(() => import('./authentication/Login'));
const ForgotPassword = lazy(() => import('./authentication/ForgotPassword'));
const Signup = lazy(() => import('./authentication/Signup'));
const AccountCenter = lazy(() => import('./authentication/AccountCenter'));
const EmailVerification = lazy(() =>
  import('./authentication/EmailVerification')
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <QuantityProvider>
          <Navbar />
          <Suspense
            fallback={
              <div className="bg-matte-black min-h-screen w-screen">
                <Navbar fallbackClass="bg-matte-black" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<EmailVerification />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/faq" element={<FAQPage />} />

              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route index element={<Dashboard />} />
              </Route>

              <Route path="/action-center" element={<PrivateRoute />}>
                <Route index element={<AccountCenter />} />
              </Route>

              <Route path="/checkout" element={<PrivateRoute />}>
                <Route index element={<CheckoutPage />} />
              </Route>

              <Route path="/order/:orderID" element={<PrivateRoute />}>
                <Route index element={<OrderInfo />} />
              </Route>

              <Route
                path="/sneaker-grid/:brandName/:sneakerID"
                element={<SneakerDetails />}
              />
            </Routes>
          </Suspense>
        </QuantityProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
