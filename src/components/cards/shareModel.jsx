import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PrimaryButton } from '../buttons/buttons';
import CloseIcon from '../../assets/close.png';
import copyIcon from '../../assets/copy.png';

const Share = ({
  isOpen,
  onClose,
  onShare,
  title = 'Share File',
  confirmLabel = 'Share',
  initialLink = '',
  initialEmail = '',
}) => {
  const [email, setEmail] = useState(initialEmail);
  const [generatedLink, setGeneratedLink] = useState(initialLink);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEmail(initialEmail);
      setGeneratedLink(initialLink);
      setCopyStatus('');
    }
  }, [isOpen, initialLink, initialEmail]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      setCopyStatus('Failed to copy');
    }
  };

  const handleShareSubmit = (e) => {
    e.preventDefault();
    const shareData = {
      email: email.trim(),
      link: generatedLink,
    };
    onShare?.(shareData);
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[50] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-70 z-[40]"
        onClick={onClose}
      />
      <div
        className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 max-w-sm w-full z-[60]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="Close modal"
        >
          <img src={CloseIcon} alt="Close" className="w-7 h-7" />
        </button>

        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
          {title}
        </h2>

        <form onSubmit={handleShareSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Send to (optional)
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="link" className="block text-gray-700 mb-2">
              Shareable Link
            </label>
            <div className="flex flex-col">
              <div className="relative">
                <input
                  type="text"
                  name="link"
                  value={generatedLink}
                  readOnly
                  className="w-full bg-gray-100 rounded-2xl px-4 py-3 border border-gray-200 text-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Copy link"
                >
                  <img
                    src={copyIcon}
                    alt="Copy"
                    className="w-5 h-5 opacity-80"
                  />
                </button>
              </div>
              {copyStatus && (
                <span className="mt-2 text-sm text-green-600">
                  {copyStatus}
                </span>
              )}
            </div>
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

export default Share;
