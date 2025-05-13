import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api/api.service';
import InputField from '../../components/inputsFields/InputField';
import backgroundImage from '../../assets/image.png';
import back from '../../assets/back.png';

function NewPassword() {
  // const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const email = state?.email || '';

  const handleNewPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await authService.resetPassword({
        email,
        // otp,
        newPassword: password,
        confirmPassword,
      });
      if (response.success) {
        navigate('/login');
      }
    } catch (err) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="flex h-screen w-screen">
      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[530px] p-10">
          <Link
            to="/verify"
            className="flex items-center text-[#002D62] hover:underline text-left mb-6"
          >
            <img src={back} alt="Back to Login" className="w-5 h-5 mr-2" />
            Back to Login
          </Link>

          <h1 className="text-3xl font-bold text-[#002D62] mb-4 text-left">
            New Password
          </h1>
          <p className="text-gray-600 mb-8 text-left">
            Create a new password that is easy to remember for you.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleNewPassword}>
            {/* <InputField
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            /> */}
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              error={error.password}
            />
            <InputField
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
              error={error.confirmPassword}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#002D62] rounded-full font-medium mb-8 hover:bg-[#001f47] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
