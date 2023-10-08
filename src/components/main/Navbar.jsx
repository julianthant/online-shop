import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

import logo from '../../assets/shoe-logo.png';
import menu_icon from '../../assets/menu.svg';
import close_menu_icon from '../../assets/close_menu.svg';
import profile_icon from '../../assets/profile-icon.svg';
import cart_icon from '../../assets/cart-icon.svg';

export default function Navbar({ fallbackClass }) {
  const [menu, setMenu] = useState(false);
  const [authPage, setAuthPage] = useState(false);
  const [signedIn, setSignedIn] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuItemClick = () => {
    setMenu(false);
  };

  useEffect(() => {
    const isAuthPage =
      location.pathname === '/login' || location.pathname === '/signup';

    if (isAuthPage) {
      setAuthPage(true);
    } else {
      setAuthPage(false);
    }
  }, [location]);

  useEffect(() => {
    if (currentUser) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  }, [currentUser]);

  const handleLogin = () => {
    navigate('/login');
    setMenu(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setMenu(false);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setMenu(false);
  };

  const navLinks = 'hover:text-emerald-600 duration-[250ms]';
  const normalMenu =
    'flex w-[31rem] justify-between max-md:hidden font-medium px-8';
  const mobileMenu = `absolute flex justify-center inset-x-0 text-center gap-8 py-8 top-[4.085rem] grid bg-[#1B1B1B]`;

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWindowWidth);
    addEventListener('resize', () => setMenu(false));
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
      removeEventListener('resize', () => setMenu(false));
    };
  }, []);

  function showNavMenu() {
    if (!signedIn && windowWidth >= 768) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <header
      className={`${fallbackClass} absolute font-medium inset-x-0 top-0 text-slate-50 backdrop-blur-md border-b-[1px] border-b-slate-400`}
    >
      <div className="container mx-auto flex justify-between items-center h-16">
        <img className="w-[11.5rem] pb-1" src={logo} alt="" />
        <nav className={`${menu ? mobileMenu : normalMenu}`}>
          <Link className={navLinks} to="/" onClick={handleMenuItemClick}>
            Home
          </Link>
          <Link className={navLinks} to="/" onClick={handleMenuItemClick}>
            Featured
          </Link>
          <Link className={navLinks} to="/" onClick={handleMenuItemClick}>
            Categories
          </Link>
          <Link className={navLinks} to="/" onClick={handleMenuItemClick}>
            Contact
          </Link>
          {signedIn && (
            <Link
              className={`${navLinks} xs:hidden`}
              to="/dashboard"
              onClick={handleMenuItemClick}
            >
              Profile
            </Link>
          )}
          {menu && !authPage && !signedIn ? (
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogin}
                className="bg-slate-50 w-36 text-slate-950 py-2 rounded-md border-2 transition-300 hover:text-slate-50 hover:bg-transparent"
              >
                Log In
              </button>
              <button
                onClick={handleSignup}
                className="bg-emerald-900 w-36 text-slate-50 py-2 rounded-md border-2 border-emerald-900 hover:border-emerald-700 transition-300 hover:bg-emerald-700"
              >
                Sign Up
              </button>
            </div>
          ) : (
            ''
          )}
        </nav>
        {showNavMenu() && (
          <div className="flex gap-4 items-center">
            {!authPage && signedIn && (
              <div className="flex gap-4 items-center">
                <button className="relative">
                  <div className="bg-red-600 w-5 h-5 absolute cart-circle rounded-full">
                    <p className="text-sm pr-[0.05rem]">0</p>
                  </div>
                  <img className="w-7" src={cart_icon} alt="cart" />
                </button>
                <button onClick={handleDashboard} className="max-xs:hidden">
                  <img className="w-10" src={profile_icon} alt="profile" />
                </button>
              </div>
            )}
            {windowWidth <= 768 && (
              <button className="md:hidden" onClick={() => setMenu(!menu)}>
                <img
                  className={`${menu ? 'w-9' : 'w-11'}`}
                  src={menu ? close_menu_icon : menu_icon}
                  alt="menu"
                />
              </button>
            )}
          </div>
        )}
        {!authPage && !signedIn && (
          <div className="flex gap-3 max-lg:hidden items-center">
            <button
              onClick={handleLogin}
              className="bg-transparent w-20 text-slate-50 py-2 rounded-md border-2 hover:text-slate-950 transition-300 hover:bg-slate-50"
            >
              Log In
            </button>
            <button
              onClick={handleSignup}
              className="bg-emerald-900 w-20 text-slate-50 py-2 rounded-md border-2 border-emerald-900 hover:border-emerald-700 transition-300 hover:bg-emerald-700"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

Navbar.propTypes = {
  fallbackClass: PropTypes.string,
};
