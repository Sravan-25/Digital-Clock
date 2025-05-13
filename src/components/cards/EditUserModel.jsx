import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { PrimaryButton } from '../buttons/buttons';
import Dropdown from '../dropdown/dropdown';
import { userPermissionOptions } from '../../data/DropDownData';
import CloseIcon from '../../assets/close.png';
import downArrowIcon from '../../assets/downArrow.png';
import upArrowIcon from '../../assets/upArrow.png';

const EditUserModel = ({
  isOpen,
  onSave,
  onCancel,
  title = 'Add User',
  confirmLabel = 'Save',
}) => {
  const [formData, setFormData] = useState({
    username: '',
    permission: null,
  });

  const handleInputChange = (e, fieldName) => {
    const value = e?.target?.value ?? e;
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[50] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-70 z-[40]"
        onClick={onCancel}
      />
      <div
        className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-sm w-full z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <img src={CloseIcon} alt="Close" className="w-7 h-7" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {title}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="permission" className="block text-gray-700 mb-2">
              User Permission
            </label>
            <Dropdown
              trigger={({ isOpen }) => (
                <div className="flex items-center w-full bg-gray-100 rounded-2xl px-4 py-3 relative cursor-pointer border border-gray-200">
                  <div className="flex-1 text-gray-500">
                    {formData.permission?.label || 'Select permission'}
                  </div>
                  <img
                    src={isOpen ? upArrowIcon : downArrowIcon}
                    alt="Arrow"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                  />
                </div>
              )}
              options={userPermissionOptions}
              onSelect={(option) => handleInputChange(option, 'permission')}
              position="below"
            />
          </div>

          <div className="flex justify-center gap-2">
            <PrimaryButton type="submit" className="w-[50%]">
              {confirmLabel}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditUserModel;
