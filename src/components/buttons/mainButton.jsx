import React from 'react';

const OptionsButton = React.forwardRef(({ onClick, ariaLabel }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className="bg-green-500 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-green-600 transition-colors"
      aria-label={ariaLabel}
    >
      ⋮
    </button>
  );
});

export default OptionsButton;
