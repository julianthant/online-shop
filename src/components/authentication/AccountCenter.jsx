import { useLocation } from 'react-router-dom';
import PasswordReset from './PasswordReset';
import EmailVerified from './EmailVerified';
import InvalidPage from './InvalidPage';
import VerifyAndChangeEmail from './VerifyAndChangeEmail';

export default function AccountCenter() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const mode = queryParams.get('mode');
  const oobCode = queryParams.get('oobCode');

  if (mode === 'resetPassword' && oobCode) {
    return <PasswordReset oobCode={oobCode} />;
  } else if (mode === 'verifyEmail' && oobCode) {
    return <EmailVerified oobCode={oobCode} />;
  } else if (mode === 'verifyAndChangeEmail' && oobCode) {
    return <VerifyAndChangeEmail oobCode={oobCode} />;
  } else {
    return <InvalidPage />;
  }
}
