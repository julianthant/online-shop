import Dashboard from './main/Dashboard';
import Login from './authentication/Login';
import Homepage from './home/Homepage';
import ForgotPassword from './authentication/ForgotPassword';
import Signup from './authentication/Signup';
import PrivateRoute from '../hooks/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../index.css';
import Navbar from './main/Navbar';
import PasswordReset from './authentication/PasswordReset';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
