import { showStatus } from '../constants/ShowStatus';

export async function HandleNameChange(
  currentUser,
  changeProfile,
  newName,
  setNewName,
  changeName,
  typeError,
  typeSuccess
) {
  try {
    await changeProfile(newName);
    changeName(newName);
    showStatus('Success! Your name has been changed', typeSuccess);
  } catch (error) {
    console.log(error);
    setNewName(currentUser.displayName);
    showStatus('Error! Failed to change display name', typeError);
  }

  setNewName('');
}

export async function HandleEmailChange(
  currentUser,
  newEmail,
  newEmailAddress,
  setNewEmailAddress,
  typeError,
  typeSuccess
) {
  try {
    await newEmail(newEmailAddress);
    setNewEmailAddress('');
    showStatus(
      'Success! Your email will change once you verify it',
      typeSuccess
    );
    showStatus(
      'After verfication you will have to log in again with your new email address',
      typeSuccess
    );
  } catch (error) {
    if (error.code === 'auth/requires-recent-login') {
      showStatus('Please re-login to change your email address.', typeError);
    } else {
      console.log(error);
      setNewEmailAddress(currentUser.email);
      showStatus('Failed to change email address', typeError);
    }
  }
}

export async function HandleVerifyEmail(verifyEmail, typeError, typeSuccess) {
  try {
    await verifyEmail();
    showStatus(
      'Success! The verification link has been sent to your inbox',
      typeSuccess
    );
  } catch (error) {
    console.log(error);
    showStatus('Error! Failed to send verification link', typeError);
  }
}

export async function HandlePasswordChange(
  newPassword,
  password,
  setPassword,
  changePassword,
  typeError,
  typeSuccess
) {
  try {
    await newPassword(password);
    changePassword('*'.repeat(password.length));
    showStatus('Success! Your password has been updated', typeSuccess);
  } catch (error) {
    setPassword('**********');
    if (error.code === 'auth/requires-recent-login') {
      showStatus('Error! Please re-login to change your password.', typeError);
    } else {
      console.log(error);
      showStatus('Error! Failed to update password', typeError);
    }
  }

  setPassword('');
}

export async function HandleLogout(logout, typeError, navigate) {
  try {
    await logout();
    navigate('/login');
  } catch (error) {
    showStatus('Error! Failed to log out', typeError);
  }
}

export async function HandleDeleteUser(deleteAccount, typeError, navigate) {
  try {
    await deleteAccount();
    navigate('/login');
  } catch (error) {
    showStatus('Error! Failed to delete account', typeError);
  }
}
