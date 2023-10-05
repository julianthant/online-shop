import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Homepage = lazy(() => import('./home/Homepage'));
const Dashboard = lazy(() => import('./main/Dashboard'));
const Login = lazy(() => import('./authentication/Login'));
const ForgotPassword = lazy(() => import('./authentication/ForgotPassword'));
const Signup = lazy(() => import('./authentication/Signup'));
import PrivateRoute from '../hooks/PrivateRoute';
import { FirebaseProvider } from '../contexts/FirebaseContexts';
import Navbar from './main/Navbar';
const AccountCenter = lazy(() => import('./authentication/AccountCenter'));
const EmailVerification = lazy(() =>
  import('./authentication/EmailVerification')
);

function App() {
  return (
    <Router>
      <FirebaseProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/action-center" element={<AccountCenter />} />
        </Routes>
      </FirebaseProvider>
    </Router>
  );
}

export default App;
