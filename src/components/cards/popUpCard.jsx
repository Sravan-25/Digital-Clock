import React from 'react';
import { RedButton, CancelButton } from '../buttons/buttons';

const ModernPopupCard = ({
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isOpen = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-300">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100 hover:scale-105">
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-4">
          <CancelButton onClick={onCancel} className="px-6 py-2 text-base">
            {cancelLabel}
          </CancelButton>
          <RedButton onClick={onConfirm} className="px-6 py-2 text-base">
            {confirmLabel}
          </RedButton>
        </div>
      </div>
    </div>
  );
};

export default ModernPopupCard;
