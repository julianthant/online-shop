import { useRef, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { showStatus } from '../../constants/ShowStatus';

function ForgotPassword() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      resetPassword(emailRef.current.value);
      navigate(
        '/login?passwordResetMessage=Your%20password%20reset%20has%20been%20sent%20to%20your%20inbox'
      );
    } catch (err) {
      console.log(err);
      showStatus('Unable to reset password', setError);
    }

    setLoading(false);
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 text-center">
            Password Reset<span className="text-emerald-900">.</span>
          </h1>
          {error && <p className="text-red-700 text-md mb-3">{error}</p>}
          <form onSubmit={handleSubmit} className="grid pt-5 gap-3">
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              autoComplete="email"
              ref={emailRef}
              required
            />
            <Link className="text-blue-700 ml-auto text-sm" to="/login">
              Back to Login
            </Link>
            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
