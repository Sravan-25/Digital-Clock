import React from 'react';
import { createPortal } from 'react-dom';
import ModernPopupCard from '../../../components/cards/popUpCard';
import useFileActionPopup from '../../../hooks/MenuHooks/useFileActions';
import downloadIcon from '../../../assets/download.png';
import usersIcon from '../../../assets/users.png';
import shareIcon from '../../../assets/share.png';
import moveIcon from '../../../assets/move.png';
import deleteIcon from '../../../assets/delete.png';
import Share from '../../../components/cards/shareModel';

const FileActionPopup = ({ isOpen, onClose, triggerPosition }) => {
  const {
    popupRef,
    isDeleteModalOpen,
    isMoveModalOpen,
    handleDownload,
    handleUserAccess,
    isShareFormOpen,
    handleShare,
    confirmShare,
    cancelShare,
    shareData,
    handleMove,
    confirmMove,
    handleDelete,
    confirmDelete,
    cancelAction,
  } = useFileActionPopup({ isOpen, onClose });

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
      <div
        className="fixed inset-0 bg-black bg-opacity-70 z-40"
        onClick={onClose}
      ></div>

      <div
        ref={popupRef}
        className="fixed bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl z-50 transition-all duration-300"
        style={{
          top: position.top,
          left: position.left,
          minWidth: '200px',
        }}
      >
        <ul className="flex flex-col m-0 p-0 list-none">
          <li>
            <button
              onClick={handleDownload}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 rounded-t-2xl transition-colors duration-200"
            >
              <img
                src={downloadIcon}
                alt="Download"
                className="w-5 h-5 mr-3 opacity-80"
              />
              Download
            </button>
          </li>
          <li>
            <button
              onClick={handleUserAccess}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={usersIcon}
                alt="User Access"
                className="w-5 h-5 mr-3 opacity-80"
              />
              User Access
            </button>
          </li>
          <li>
            <button
              onClick={handleShare}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={shareIcon}
                alt="Share"
                className="w-5 h-5 mr-3 opacity-80"
              />
              Share
            </button>
          </li>
          <li>
            <button
              onClick={handleMove}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={moveIcon}
                alt="Move"
                className="w-5 h-5 mr-3 opacity-80"
              />
              Move
            </button>
          </li>
          <li>
            <button
              onClick={handleDelete}
              className="w-full flex items-center text-left px-6 py-3 text-red-600 hover:bg-red-50 rounded-b-2xl transition-colors duration-200"
            >
              <img
                src={deleteIcon}
                alt="Delete"
                className="w-5 h-5 mr-3 opacity-80"
              />
              Delete
            </button>
          </li>
        </ul>
      </div>

      <ModernPopupCard
        isOpen={isDeleteModalOpen}
        title="Delete File"
        message="Are you sure you want to delete this file? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelAction}
      />

      <ModernPopupCard
        isOpen={isMoveModalOpen}
        title="Move File"
        message="Are you sure you want to move this file?"
        confirmLabel="Move"
        cancelLabel="Cancel"
        onConfirm={confirmMove}
        onCancel={cancelAction}
      />

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
