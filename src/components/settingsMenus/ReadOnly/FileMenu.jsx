import React from 'react';
import { createPortal } from 'react-dom';
import useFileActionPopup from '../../../hooks/MenuHooks/useFileActions';
import downloadIcon from '../../../assets/download.png';
import shareIcon from '../../../assets/share.png';
import Share from '../../cards/shareModel';

const FileActionPopup = ({ isOpen, onClose, triggerPosition }) => {
  const {
    popupRef,
    handleDownload,
    isShareFormOpen,
    handleShare,
    confirmShare,
    cancelShare,
    shareData,
  } = useFileActionPopup({
    isOpen,
    onClose,
  });

  const calculatePosition = () => {
    if (!triggerPosition) return { top: '50%', left: '50%' };

    const { x, y, width, height } = triggerPosition;
    const popupWidth = 200;
    const popupHeight = 200;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = y + height + 5;
    let left = x;

    if (left + popupWidth > viewportWidth - 20) {
      left = viewportWidth - popupWidth - 20;
    }

    if (top + popupHeight > viewportHeight - 20) {
      top = y - popupHeight - 5;
    }

    if (left < 256 + 10) {
      left = 266;
    }

    if (top < 64 + 10) {
      top = 74;
    }

    return { top: `${top}px`, left: `${left}px` };
  };

  if (!isOpen) return null;

  const position = calculatePosition();

  const popupContent = (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div
        ref={popupRef}
        className="fixed bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl z-50 transition-all duration-300"
        style={{
          top: position.top,
          left: position.left,
          minWidth: '200px',
        }}
      >
        <ul className="flex flex-col m-0 p-0 list-none px-[10%]">
          <li className="border-b border-gray-300 rounded-t-2xl overflow-hidden">
            <button
              onClick={handleDownload}
              className="w-full flex items-center text-left py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={downloadIcon}
                alt="Download"
                className="w-5 h-5 mr-3 opacity-80"
              />
              <span className="whitespace-nowrap">Download</span>
            </button>
          </li>
          <li className="rounded-b-2xl overflow-hidden">
            <button
              onClick={handleShare}
              className="w-full flex items-center text-left py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={shareIcon}
                alt="Share"
                className="w-5 h-5 mr-3 opacity-80"
              />
              <span className="whitespace-nowrap">Share</span>
            </button>
          </li>
        </ul>
      </div>

      <Share
        isOpen={isShareFormOpen}
        onClose={cancelShare}
        onShare={confirmShare}
        initialLink={shareData.link}
        initialEmail={shareData.email}
        title="Share File"
        confirmLabel="Share"
      />
    </>
  );

  return createPortal(popupContent, document.body);
};

export default FileActionPopup;
