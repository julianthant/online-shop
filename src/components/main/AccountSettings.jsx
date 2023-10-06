import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  HandleNameChange,
  HandleEmailChange,
  HandlePasswordChange,
  HandleLogout,
  HandleDeleteUser,
} from '../../functions/AccontFunctions';
import { showStatus } from '../../constants/ShowStatus';

export default function AccountSettings() {
  const {
    currentUser,
    logout,
    deleteAccount,
    changeProfile,
    newEmail,
    newPassword,
  } = useAuth();
  const navigate = useNavigate();

  const emailAddress = currentUser.email;
  const emailVerify = currentUser.emailVerified;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [password, setPassword] = useState('**********');

  const [newDisplayName, setNewDisplayName] = useState('');
  const [newEmailAddress, setNewEmailAddress] = useState('');
  const [changePassword, setChangePassword] = useState('');

  const [editDisplayName, setEditDisplayName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editVerify, setEditVerify] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const userStyles = 'font-bold text-[0.75rem] pb-1 text-light-gray';
  const userEdit =
    'bg-dark-gray w-16 text-sm text-slate-50 rounded-[0.22rem] h-9 hover:bg-light-gray transition-all';

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleEditSave(e, id, setEditState, editState) {
    e.preventDefault();

    if (id === 'displayName') {
      if (emailVerify) {
        HandleNameChange(
          currentUser,
          changeProfile,
          newDisplayName,
          setNewDisplayName,
          setDisplayName,
          setError,
          setSuccess
        );
      } else {
        showStatus(
          'Please verify your email before you make changes to your account',
          setError
        );
      }
    } else if (id === 'emailAddress') {
      if (emailVerify) {
        HandleEmailChange(
          currentUser,
          newEmail,
          newEmailAddress,
          setNewEmailAddress,
          setError,
          setSuccess
        );
      } else {
        showStatus(
          'Please verify your email before you make changes to your account',
          setError
        );
      }
    } else if (id === 'password') {
      if (emailVerify) {
        HandlePasswordChange(
          newPassword,
          changePassword,
          setChangePassword,
          setPassword,
          setError,
          setSuccess
        );
      } else {
        showStatus(
          'Please verify your email before you make changes to your account',
          setError
        );
      }
    }
    setEditState(!editState);
  }

  function handleVerify(setEditState, editState, id) {
    if (id === 'accountStatus') {
      navigate('/verify-email');
    }
    setEditState(!editState);
  }

  function handleCancel(id) {
    if (id === 'displayName') {
      setNewDisplayName('');
      setEditDisplayName(false);
    } else if (id === 'emailAddress') {
      setNewEmailAddress('');
      setEditEmail(false);
    } else if (id === 'password') {
      setChangePassword('');
      setEditPassword(false);
    }
  }

  const userFields = [
    {
      id: 'displayName',
      label: 'DISPLAY NAME',
      editState: editDisplayName,
      setEditState: setEditDisplayName,
      value: editDisplayName ? newDisplayName : displayName,
      setValue: editDisplayName ? setNewDisplayName : setDisplayName,
      type: 'text',
      buttonName: 'Edit',
      buttonClass: userEdit,
      placeholder: displayName,
    },
    {
      id: 'emailAddress',
      label: 'EMAIL',
      editState: editEmail,
      setEditState: setEditEmail,
      value: editEmail ? newEmailAddress : emailAddress,
      setValue: editEmail ? setNewEmailAddress : null,
      type: 'email',
      buttonName: 'Edit',
      buttonClass: userEdit,
      placeholder: emailAddress,
    },
    {
      id: 'accountStatus',
      label: 'ACCOUNT STATUS',
      editState: emailVerify ? false : editVerify,
      setEditState: emailVerify ? null : setEditVerify,
      value: emailVerify ? 'Verified' : 'Not Verified',
      setValue: setEditVerify,
      type: 'text',
      buttonName: emailVerify ? '' : 'Verify',
      buttonClass: emailVerify ? '' : userEdit,
    },
    {
      id: 'password',
      label: 'PASSWORD',
      editState: editPassword,
      setEditState: setEditPassword,
      value: editPassword ? changePassword : password,
      setValue: editPassword ? setChangePassword : setPassword,
      type: 'password',
      buttonName: 'Change Password',
      buttonClass: 'w-40 ' + userEdit,
      placeholder: 'Password',
    },
  ];

  useEffect(() => {
    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWindowWidth);
    return () => {
      window.removeEventListener('resize', updateWindowWidth);
    };
  }, []);

  const isBelowBreakpoint = () => {
    return windowWidth <= 650;
  };

  return (
    <>
      <div className="pb-10 border-below">
        {error && <p className="text-red-700 text-md mb-3">{error}</p>}
        {success && <p className="text-green-700 text-md mb-3">{success}</p>}
        <div
          type="list"
          className="text-slate-50 py-6 px-6 rounded-md flex flex-col gap-10 bg-[#1B1B1B]"
        >
          {userFields.map((field) => (
            <form
              key={field.id}
              onSubmit={(e) =>
                handleEditSave(e, field.id, field.setEditState, field.editState)
              }
              className="flex justify-between sm:items-end max-sm:flex-col"
            >
              <div>
                <p className={userStyles}>{field.label}</p>
                {(field.editState && field.id !== 'accountStatus') ||
                isBelowBreakpoint() ? (
                  <label htmlFor={field.id}>
                    <input
                      id={field.id}
                      type={field.type}
                      value={
                        isBelowBreakpoint() && !field.editState
                          ? null
                          : field.value
                      }
                      defaultValue={
                        isBelowBreakpoint() && !field.editState
                          ? field.value
                          : null
                      }
                      placeholder={field.placeholder}
                      onChange={
                        isBelowBreakpoint() && !field.editState
                          ? null
                          : (e) => field.setValue(e.target.value)
                      }
                      required
                      className="bg-[#28282B] max-sm:w-full py-2 px-3 rounded-[0.25rem] mt-1 w-60"
                    />
                  </label>
                ) : (
                  <p className="text-[0.95rem]">{field.value}</p>
                )}
              </div>
              {field.editState && field.id !== 'accountStatus' ? (
                <div className="flex gap-3 max-sm:pt-5">
                  <button
                    onClick={() => handleCancel(field.id)}
                    className="max-sm:hidden bg-transparent w-16 max-sm:w-1/2 text-sm text-white h-9 hover:underline underline-offset-[3px]"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleCancel(field.id)}
                    className="sm:hidden rounded-[0.22rem] bg-red-700 w-16 max-sm:w-1/2 text-sm text-white h-9 hover:bg-red-500"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className={`${field.buttonClass} max-sm:w-1/2`}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    handleVerify(field.setEditState, field.editState, field.id)
                  }
                  className={`${field.buttonClass} max-sm:mt-5 max-sm:w-full`}
                  type="button"
                >
                  {field.buttonName}
                </button>
              )}
            </form>
          ))}
        </div>
      </div>

      {/* Account Removal */}
      <div className="flex flex-col mt-10">
        <h4 className={userStyles}>ACCOUNT REMOVAL</h4>
        <div className="flex items-center gap-4 mt-3 mb-10">
          <button
            onClick={() => HandleLogout(logout, setError, navigate)}
            className="h-9 text-sm border-[1px] max-sm:w-1/2 bg-slate-50 w-36 text-slate-950 rounded-[0.25rem] hover:bg-light-gray transition-all duration-200 border-light-gray"
          >
            Log Out
          </button>
          <button
            onClick={() => HandleDeleteUser(deleteAccount, setError, navigate)}
            className="h-9 text-sm border-[1px] max-sm:w-1/2 border-red-700 bg-transparent text-slate-50 w-36 rounded-[0.25rem] hover:bg-red-700 fill-button"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
