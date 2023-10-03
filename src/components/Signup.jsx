import '../index.css';

import { useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { showStatus } from '../constants/ShowStatus';

export default function NewSignup() {
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return showStatus('Passwords do not match', setError);
    }

    try {
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        `${firstRef.current.value} ${lastRef.current.value}`
      );
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      showStatus('Failed to create an account', setError);
    }

    setLoading(false);
  }

  return (
    <section className="flex items-center bg-matte-black pt-10">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid max-w-[35rem]">
          <p className="font-bold text-slate-200">BUY YOUR DREAMS</p>
          <h1 className="text-slate-50 text-5xl font-bold font-[Montserrat] py-3">
            Create new account<span className="text-emerald-900">.</span>
          </h1>
          <p className="text-slate-200">
            Already a member?{' '}
            <Link className="text-blue-700" to="/login">
              Log In
            </Link>
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid pt-5 gap-3 max-w-[29rem]"
          >
            <div className="flex gap-3 ">
              <input
                className="auth-input w-1/2"
                type="text"
                placeholder="First Name"
                autoComplete="first-name"
                ref={firstRef}
                required
              />
              <input
                className="auth-input w-1/2"
                type="text"
                placeholder="Last Name"
                autoComplete="last-name"
                ref={lastRef}
                required
              />
            </div>
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
              autoComplete="new-password"
              ref={passwordRef}
              required
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              ref={passwordConfirmRef}
              required
            />
            {error && <p className="text-red-500">Error: {error}</p>}
            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
              >
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
