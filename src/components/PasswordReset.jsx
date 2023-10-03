import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { showStatus } from '../constants/ShowStatus';
import { useAuth } from '../hooks/useAuth';

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { confirmPasswordResetToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const oobCode = queryParams.get('oobCode');

  async function handlePasswordReset(e) {
    e.preventDefault();

    try {
      setLoading(true);
      if (newPassword !== confirmPassword) {
        showStatus('Passwords do not match', setError);
        return;
      }
      await confirmPasswordResetToken(oobCode, newPassword);
      navigate('/login?passwordResetMessage=Password%20reset%20successfully');
    } catch (error) {
      showStatus('Unable to reset password', setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 mb-3 text-center">
            Password Reset<span className="text-emerald-900">.</span>
          </h1>
          {error && <p className="text-red-700 text-md">{error}</p>}
          <form onSubmit={handlePasswordReset} className="grid pt-2 gap-3">
            <input type="text" defaultValue="" autoComplete="username" hidden />
            <input type="email" defaultValue="" autoComplete="email" hidden />
            <input
              className="auth-input"
              type="password"
              placeholder="New Password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <p className="text-slate-200 text-sm">
              No longer necessary?{' '}
              <Link className="text-blue-700" to="/login">
                Cancel
              </Link>
            </p>
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
