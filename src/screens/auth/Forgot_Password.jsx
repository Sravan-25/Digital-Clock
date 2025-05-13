import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api/api.service';
import InputField from '../../components/inputsFields/InputField';
import backgroundImage from '../../assets/image.png';
import back from '../../assets/back.png';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.forgotPassword(email);
      if (response.success) {
        navigate('/verify', { state: { email } });
      }
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
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
        <div className="w-full max-w-[530px] p-10">
          <Link
            to="/login"
            className="flex items-center text-[#002D62] hover:underline text-left mb-6"
          >
            <img src={back} alt="Back to Login" className="w-5 h-5 mr-2" />
            Back to Login
          </Link>

          <h1 className="text-3xl font-bold text-[#002D62] mb-4 text-left">
            Forgot Password
          </h1>
          <p className="text-gray-600 mb-8 text-left">
            Enter email that is associated with this account.
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleForgotPassword}>
            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#002D62] rounded-full font-medium mb-8 hover:bg-[#001f47] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
