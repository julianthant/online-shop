import { useRef, useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { showStatus } from '../../constants/ShowStatus';

export default function NewSignup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const passwordResetMessage = queryParams.get('passwordResetMessage');

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (passwordResetMessage) {
      const timeoutId = setTimeout(() => {
        navigate('/login', { replace: true });
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [passwordResetMessage, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/invalid-login-credentials') {
        showStatus(
          'Invalid login credentials. Please check your email and password.',
          setError
        );
      } else {
        showStatus('An error occurred during login', setError);
      }
    }

    setLoading(false);
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-5 text-center">
            Log In<span className="text-emerald-900">.</span>
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          {passwordResetMessage && (
            <p className="text-green-700 text-md mb-3">
              {passwordResetMessage}
            </p>
          )}
          <form onSubmit={handleSubmit} className="grid pt-2 gap-3">
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              autoComplete="email-address"
              ref={emailRef}
              required
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Password"
              autoComplete="password"
              ref={passwordRef}
              required
            />
            <div className="flex justify-between">
              <p className="text-slate-200 text-sm">
                Need an account?{' '}
                <Link className="text-blue-700" to="/signup">
                  Sign Up
                </Link>
              </p>
              <Link className="text-blue-700 text-sm" to="/forgot-password">
                Forgot Password
              </Link>
            </div>
            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-300 hover:bg-emerald-800 hover:w-[15rem]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
