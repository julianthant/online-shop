import '../index.css';

import { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function NewSignup() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setError('Unable to log in');
    }

    setLoading(false);
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-3 text-center">
            Log In<span className="text-emerald-900">.</span>
          </h1>

          <form onSubmit={handleSubmit} className="grid pt-5 gap-3">
            <input
              className="auth-input"
              type="text"
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
            {error && <p className="text-red-500">Error: {error}</p>}
            <p className="text-slate-200">
              Need an account?{' '}
              <Link className="text-blue-700" to="/signup">
                Sign Up
              </Link>
            </p>
            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
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
