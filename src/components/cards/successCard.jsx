import React from 'react';
import { PrimaryButton } from '../buttons/buttons';
import checkmarkIcon from '../../assets/done.png';

const SuccessPopupCard = ({
  title = 'Password Changed',
  message = 'Your password has been successfully changed, you can log in back with a new password.',
  buttonLabel = 'Continue',
  onButtonClick,
  isOpen = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-60">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center">
        <div className="flex justify-center mb-4">
          <img src={checkmarkIcon} alt="Success" className="w-16 h-16" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <PrimaryButton
          onClick={onButtonClick}
          className="w-full py-2 text-base"
        >
          {buttonLabel}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default SuccessPopupCard;
