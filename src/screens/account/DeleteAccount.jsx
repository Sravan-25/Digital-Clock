import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CancelButton, PrimaryButton } from '../../components/buttons/buttons';
import ModernPopupCard from '../../components/cards/popUpCard';
import InputField from '../../components/inputsFields/InputField';
import back from '../../assets/back.png';

function DeleteAccount() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    password: '',
    general: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsLogoutModalOpen(true);
    }, 1000);
  };

  const confirmDelete = () => {
    setIsLogoutModalOpen(false);
    console.log('Account deleted and logged out');
  };

  const cancelDelete = () => {
    setIsLogoutModalOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-full">
      <div className="w-full max-w-[530px] px-10 pt-6 pb-10 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/account"
            className="flex items-center text-[#002D62] hover:underline"
          >
            <img src={back} alt="Back to Account" className="w-5 h-5 mr-2" />
            Back
          </Link>
          <h2 className="text-2xl font-bold text-[#002D62]">Delete Account</h2>
        </div>

        {error.general && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-8">
            {error.general}
          </div>
        )}

        <form onSubmit={handleDeleteAccount}>
          <p className="text-gray-600 mb-8 text-left">
            This action is permanent. By deleting account, you whole data like
            your folders, files and personal information will be deleted
            permanently.
          </p>
          <div className="mb-4">
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              error={error.password}
            />
          </div>
          <div className="flex justify-end gap-4">
            <CancelButton onClick={() => window.history.back()}>
              Cancel
            </CancelButton>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </PrimaryButton>
          </div>
        </form>
      </div>

      <ModernPopupCard
        isOpen={isLogoutModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete your account? This action cannot be undone."
        confirmLabel="Yes, Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default DeleteAccount;
