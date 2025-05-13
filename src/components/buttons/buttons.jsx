import React from 'react';

const RedButton = ({ children, onClick, className = '', disabled = false, loading = false }) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-wait' : ''} ${className}`}
  >
    {loading ? 'Loading...' : children}
  </button>
);

const CancelButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`px-4 py-2 rounded-full text-gray-700 bg-transparent border border-gray-300 hover:bg-gray-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-wait' : ''} ${className}`}
  >
    {loading ? 'Loading...' : children}
  </button>
);

const PrimaryButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`px-4 py-2 rounded-full text-white bg-[#002D62] hover:bg-[#001f47] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-wait' : ''} ${className}`}
  >
    {loading ? 'Loading...' : children}
  </button>
);

const MainButton = ({
  children,
  onClick,
  className = '',
  disabled = false,
  loading = false,
}) => (
  <button
    onClick={onClick}
    disabled={disabled || loading}
    className={`border border-[#002D62] text-[#002D62] rounded-full px-5 py-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'opacity-50 cursor-wait' : ''} ${className}`}
  >
    {loading ? 'Loading...' : children}
  </button>
);

export { RedButton, CancelButton, PrimaryButton, MainButton };


const OptionsButton = React.forwardRef(({ onClick, ariaLabel = 'Folder options menu' }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="bg-[#002D62] text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-[#001f47] transition-colors"
      aria-label={ariaLabel}
    >
      ⋮
    </button>
  );
});

export default OptionsButton;


