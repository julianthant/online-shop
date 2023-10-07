import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import InvalidPage from './InvalidPage';

// Define lazy-loaded components
const PasswordReset = lazy(() => import('./PasswordReset'));
const EmailVerified = lazy(() => import('./EmailVerified'));
const VerifyAndChangeEmail = lazy(() => import('./VerifyAndChangeEmail'));

export default function AccountCenter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const mode = queryParams.get('mode');
  const oobCode = queryParams.get('oobCode');

  const renderComponent = () => {
    if (mode === 'resetPassword' && oobCode) {
      return <PasswordReset oobCode={oobCode} />;
    } else if (mode === 'verifyEmail' && oobCode) {
      return <EmailVerified oobCode={oobCode} />;
    } else if (mode === 'verifyAndChangeEmail' && oobCode) {
      return <VerifyAndChangeEmail oobCode={oobCode} />;
    } else {
      return <InvalidPage />;
    }
  };

  return <Suspense>{renderComponent()}</Suspense>;
}
