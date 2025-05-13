import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { authService } from '../../api/api.service';
import { PrimaryButton, CancelButton } from '../../components/buttons/buttons';
import InputField from '../../components/inputsFields/InputField';
import SuccessPopUpCard from '../../components/cards/successCard';
import back from '../../assets/back.png';

function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const { state } = useLocation();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setIsSuccessPopupOpen(true);
    }, 1000);
  };

  const handleContinue = () => {
    setIsSuccessPopupOpen(false);
  };

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword(!showOldPassword);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          </Link>
          <h2 className="text-2xl font-bold text-[#002D62]">Change Password</h2>
        </div>

        {error.general && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-8">
            {error.general}
          </div>
        )}

        <form onSubmit={handleUpdatePassword}>
          <div className="mb-4">
            <InputField
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              showPassword={showOldPassword}
              togglePasswordVisibility={toggleOldPasswordVisibility}
              error={error.oldPassword}
            />
          </div>
          <p className="text-gray-600 mb-8 text-left">
            Create a new password that is easy to remember for you.
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
          <div className="mb-8">
            <InputField
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
              error={error.confirmPassword}
            />
          </div>

          <div className="flex justify-end gap-4">
            <CancelButton onClick={() => window.history.back()}>
              Cancel
            </CancelButton>
            <PrimaryButton type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </PrimaryButton>
          </div>
        </form>
      </div>

      <SuccessPopUpCard
        isOpen={isSuccessPopupOpen}
        title="Password Changed"
        message="Your password has been successfully changed, you can log in back with a new password."
        buttonLabel="Continue"
        onButtonClick={handleContinue}
      />
    </div>
  );
}

export default UpdatePassword;
