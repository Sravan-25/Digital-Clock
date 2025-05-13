import React from 'react';
import { Link } from 'react-router-dom';
import InputField from '../../components/inputsFields/InputField';
import backgroundImage from '../../assets/image.png';
import useSignUp from '../../hooks/useSignUp';

function SignUp() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    apiError,
    loading,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleSignUp,
  } = useSignUp();

  return (
    <div className="flex h-screen w-screen">
      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-[530px] p-10 text-center">
          <h1 className="text-3xl font-bold text-[#002D62] mb-2 text-left">
            Sign Up
          </h1>
          <p className="text-gray-600 mb-6 text-left">
            Create your account to get started!
          </p>

          {apiError && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSignUp}>
            <InputField
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
            />

            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              error={errors.password}
            />

            <InputField
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showPassword={showConfirmPassword}
              togglePasswordVisibility={toggleConfirmPasswordVisibility}
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#002D62] rounded-full font-medium mb-5 hover:bg-[#001f47] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-gray-600">
            Already have an account?{' '}
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

export default SignUp;
