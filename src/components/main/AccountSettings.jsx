import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useNewEmailAddress } from '../../hooks/useEmailAddress';
import {
  HandleNameChange,
  HandleEmailChange,
  HandleVerifyEmail,
  HandlePasswordChange,
  HandleLogout,
  HandleDeleteUser,
} from '../../functions/AccontFunctions';

export default function AccountSettings() {
  const {
    currentUser,
    logout,
    deleteAccount,
    changeProfile,
    newEmail,
    verifyEmail,
    newPassword,
    emailVerify,
  } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [emailAddress, setEmailAddress] = useState(currentUser.email);
  const [password, setPassword] = useState('**********');

  const [newDisplayName, setNewDisplayName] = useState('');
  const [newEmailAddress, setNewEmailAddress] = useNewEmailAddress();
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
      HandleNameChange(
        currentUser,
        changeProfile,
        newDisplayName,
        setNewDisplayName,
        setDisplayName,
        setError,
        setSuccess
      );
    } else if (id === 'emailAddress') {
      HandleEmailChange(
        currentUser,
        newEmail,
        newEmailAddress,
        setNewEmailAddress,
        setError,
        setSuccess
      );
    } else if (id === 'password') {
      HandlePasswordChange(
        newPassword,
        changePassword,
        setChangePassword,
        setPassword,
        setError,
        setSuccess
      );
    }

    setEditState(!editState);
  }

  function handleVerify(setEditState, editState, id) {
    if (id === 'accountStatus') {
      HandleVerifyEmail(verifyEmail, setError, setSuccess);
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
    },
    {
      id: 'emailAddress',
      label: 'EMAIL',
      editState: editEmail,
      setEditState: setEditEmail,
      value: editEmail ? newEmailAddress : emailAddress,
      setValue: editEmail ? setNewEmailAddress : setEmailAddress,
      type: 'email',
      buttonName: 'Edit',
      buttonClass: userEdit,
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
    },
  ];

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
              className="flex justify-between items-end"
            >
              <div>
                <p className={userStyles}>{field.label}</p>
                {field.editState && field.id !== 'accountStatus' ? (
                  <label htmlFor={field.id}>
                    <input
                      id={field.id}
                      type={field.type}
                      value={field.value}
                      placeholder="Edit"
                      onChange={(e) => field.setValue(e.target.value)}
                      required
                      className="bg-[#28282B] py-2 px-3 rounded-[0.25rem] mt-1 w-60"
                    />
                  </label>
                ) : (
                  <p className="text-[0.95rem]">{field.value}</p>
                )}
              </div>
              {field.editState && field.id !== 'accountStatus' ? (
                <div className="flex gap-5">
                  <button
                    onClick={() => handleCancel(field.id)}
                    className="bg-red-500 w-16 text-sm text-white rounded-[0.22rem] h-9 hover:bg-red-600 transition-all"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button className={field.buttonClass} type="submit">
                    Save
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    handleVerify(field.setEditState, field.editState, field.id)
                  }
                  className={field.buttonClass}
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
            className="h-9 text-sm border-[1px] bg-slate-50 w-36 text-slate-950 rounded-[0.25rem] hover:bg-light-gray transition-all duration-200 border-light-gray"
          >
            Log Out
          </button>
          <button
            onClick={() => HandleDeleteUser(deleteAccount, setError, navigate)}
            className="h-9 text-sm border-[1px] border-red-700 bg-transparent text-slate-50 w-36 rounded-[0.25rem] hover:bg-red-700 fill-button"
          >
            Delete Account
          </button>
        </div>
      </div>
    </>
  );
}
