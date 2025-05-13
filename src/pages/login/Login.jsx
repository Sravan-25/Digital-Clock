import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../api/api.service';
import InputField from '../../components/inputsFields/InputField';
import backgroundImage from '../../assets/image.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.signIn({ email, password });

      if (response.success) {
        localStorage.setItem('token', response.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberMe');
        }
        navigate('/home');
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 'Failed to login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <div className="w-full max-w-[530px] p-10 text-center">
          <h1 className="text-3xl font-bold text-[#002D62] mb-2 text-left">
            Log In
          </h1>
          <p className="text-gray-600 mb-6 text-left">Welcome back!</p>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <InputField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-sm text-gray-600">Remember Me</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-white bg-[#002D62] rounded-full font-medium mb-5 hover:bg-[#001f47] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          <p className="text-sm text-gray-600 mb-4">
            <a
              href="/forgot-password"
              className="text-[#002D62] font-semibold hover:underline"
            >
              Forgot Password?
            </a>
          </p>

          <p className="text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              to="/signup"
              className="text-[#002D62] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
