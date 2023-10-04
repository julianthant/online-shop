import Dashboard from './main/Dashboard';
import Login from './authentication/Login';
import Homepage from './home/Homepage';
import ForgotPassword from './authentication/ForgotPassword';
import Signup from './authentication/Signup';
import PrivateRoute from '../hooks/PrivateRoute';
import { FirebaseProvider } from '../contexts/FirebaseContexts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../index.css';
import Navbar from './main/Navbar';
import AccountCenter from './authentication/AccountCenter';
import EmailVerification from './authentication/EmailVerification';

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
