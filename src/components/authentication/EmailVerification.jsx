import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HandleVerifyEmail } from '../../functions/AccontFunctions';
import { showStatus } from '../../constants/ShowStatus';

export default function EmailVerification() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdown, setCountdown] = useState(60); // 60 seconds countdown
  const { verifyEmail } = useAuth();

  useEffect(() => {
    let countdownTimer;

    if (isCountdownActive) {
      countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(countdownTimer);
            setIsCountdownActive(false);
            setResendMessage('');
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(countdownTimer);
    };
  }, [isCountdownActive]);

  async function handleEmailVerification(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await HandleVerifyEmail(verifyEmail, setError, setSuccess);
      setIsCountdownActive(true);
      setResendMessage('The verification code has been resent to your inbox.');
    } catch (error) {
      console.error(error);
      showStatus('Failed to resend verification code', setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex items-center bg-matte-black">
      <div className="container mx-auto flex flex-wrap-reverse justify-center">
        <div className="grid login-container">
          <h1 className="text-slate-50 text-4xl font-bold font-[Montserrat] py-3 mb-3 text-center">
            Send Verification<span className="text-emerald-900">.</span>
          </h1>
          {error && <p className="text-red-700 text-md">{error}</p>}
          {success && <p className="text-green-700 text-md">{success}</p>}
          <form onSubmit={handleEmailVerification} className="grid pt-2 gap-3">
            <p className="text-slate-200 text-md mb-3">
              Please click the verification link in your email to verify your
              account.
            </p>
            {resendMessage && (
              <p className="text-green-700 text-md mb-3">
                {resendMessage} <br /> Please retry in - {countdown} seconds
              </p>
            )}
            <Link className="text-blue-700" to="/dashboard">
              Return to Dashboard
            </Link>
            <div className="flex justify-center">
              <button
                disabled={loading || isCountdownActive}
                type="submit"
                className="bg-emerald-900 py-[0.9rem] rounded-full w-[14rem] mt-3 font-bold text-slate-50 transition-all duration-300 hover:bg-emerald-800 hover:w-[15rem]"
              >
                Get Verification Link
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
