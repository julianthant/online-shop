import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import PrivateRoute from '../hooks/PrivateRoute';
import { FirebaseProvider } from '../contexts/FirebaseContexts';
import Navbar from './main/Navbar';
import SneakerDetails from './pages/sneakers/SneakerDetails';
import SneakerGrid from './pages/sneakers//SneakerGrid';

const Lookbook = lazy(() => import('./pages/lookbook/LookbookPage'));
const Collections = lazy(() => import('./pages/collections/CollectionsPage'));

const CartPage = lazy(() => import('./pages/cart/CartPage'));
const ContactsPage = lazy(() => import('./pages/contacts/ContactsPage'));

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
      <FirebaseProvider>
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
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/action-center" element={<PrivateRoute />}>
              <Route index element={<AccountCenter />} />
            </Route>
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/sneaker-grid/:brandName" element={<SneakerGrid />} />
            <Route
              path="/sneaker-grid/:brandName/:sneakerID"
              element={<SneakerDetails />}
            />
          </Routes>
        </Suspense>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
