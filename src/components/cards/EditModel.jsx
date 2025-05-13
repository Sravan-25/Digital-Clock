import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import InputField from '../inputsFields/InputField';
import { PrimaryButton } from '../buttons/buttons';
import CloseIcon from '../../assets/close.png';

const EditFormModal = ({
  isOpen,
  onSave,
  onCancel,
  title = 'Edit Item',
  fields = [],
  confirmLabel = 'Save',
  cancelLabel = 'Cancel',
  error,
}) => {
  const [formData, setFormData] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    const initialData = fields.reduce((acc, field) => {
      acc[field.name] = field.initialValue || '';
      return acc;
    }, {});
    setFormData(initialData);
  }, [fields]);

  const handleInputChange = (e, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 z-[100]" />
      <div className="fixed inset-0 z-[110] flex items-center justify-center">
        <div
          ref={modalRef}
          className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-sm w-full"
        >
          <button
            onClick={onCancel}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Close modal"
          >
            <img
              src={CloseIcon}
              alt="Close"
              className="w-7 h-7 text-gray-500"
            />
          </button>

          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex justify-center">
            {title}
          </h2>
          {error && (
            <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div key={field.name} className="mb-4">
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 mb-2"
                >
                  {field.label}
                </label>
                <InputField
                  type={field.type || 'text'}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(e, field.name)}
                  placeholder={field.placeholder}
                  required={field.required || false}
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {cancelLabel}
              </button>
              <PrimaryButton type="submit" className="px-4 py-2">
                {confirmLabel}
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>,
    document.body
  );
};

export default EditFormModal;
