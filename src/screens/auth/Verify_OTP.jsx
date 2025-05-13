import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OTPInput from '../../components/inputsFields/OTPInput';
import { authService } from '../../api/api.service';
import backgroundImage from '../../assets/image.png';

function veridy() {
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.resetPassword({ email, otp });

      if (response.success) {
        localStorage.removeItem('email');
        navigate('/forgot-password');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to verify OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
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
        <div className="w-full max-w-[550px] p-10 text-center">
          <h1 className="text-3xl font-bold text-[#002D62] mb-2 text-left">
            Verification Code
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            An OTP has been sent to {email}. Please enter it below.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleVerifyOTP}>
            <div className="mb-8">
              <label className="block text-gray-600 mb-2 text-sm font-medium text-left">
                OTP Code
              </label>
              <OTPInput
                length={6}
                onChange={(value) => setCode(value)}
                className="flex justify-between gap-2"
              />
            </div>
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3 text-white bg-[#002D62] rounded-full font-medium mb-5 hover:bg-[#001f47] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                    className="opacity-25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    className="opacity-75"
                  />
                </svg>
              ) : null}
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </form>

          <p className="text-sm text-gray-600">
            Back to{' '}
            <Link
              to="/login"
              className="text-[#002D62] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default veridy;
