import Dashboard from './Dashboard';
import Login from './Login';
import Homepage from './Homepage';
import ForgotPassword from './ForgotPassword';
import Signup from './Signup';
import PrivateRoute from '../hooks/PrivateRoute';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import '../index.css';
import Navbar from './Navbar';

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
          <Route path="/update-profile" element={<PrivateRoute />}>
            <Route index element={<UpdateProfile />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
