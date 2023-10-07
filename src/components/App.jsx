import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './home/Homepage';
import PrivateRoute from '../hooks/PrivateRoute';
import { FirebaseProvider } from '../contexts/FirebaseContexts';
import Navbar from './main/Navbar';

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
        <Suspense>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route index element={<Dashboard />} />
            </Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/action-center" element={<AccountCenter />} />
            </Route>
          </Routes>
        </Suspense>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
