import React from 'react';
import { createPortal } from 'react-dom';
import ModernPopupCard from '../../../components/cards/popUpCard';
import EditFormModal from '../../cards/EditModel';
import editIcon from '../../../assets/edit.png';
import useFolderActions from '../../../hooks/MenuHooks/useFolderActions';
import usersIcon from '../../../assets/users.png';
import deleteIcon from '../../../assets/delete.png';

const FileActionPopup = ({
  isOpen,
  onClose,
  triggerPosition,
  fileData,
  onSuccess,
}) => {
  const {
    popupRef,
    isDeleteModalOpen,
    isEditFormOpen,
    loading,
    error,
    handleUserAccess,
    handleDelete,
    confirmDelete,
    handleEdit,
    confirmEdit,
    cancelEdit,
    cancelAction,
  } = useFolderActions({ isOpen, onClose, fileData, onSuccess });

  const calculatePosition = () => {
    if (!triggerPosition) return { top: '50%', left: '50%' };

    const { x, y, width, height } = triggerPosition;
    const popupWidth = 200;
    const popupHeight = 240;
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

  return createPortal(
    <>
      {!isEditFormOpen && !isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={onClose}
        />
      )}

      <div
        ref={popupRef}
        className="fixed bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl z-50 transition-all duration-300"
        style={calculatePosition()}
      >
        <ul className="flex flex-col m-0 p-0 list-none">
          <li>
            <button
              onClick={handleUserAccess}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200 rounded-t-2xl"
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
              onClick={handleEdit}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={editIcon}
                alt="Edit"
                className="w-5 h-5 mr-3 opacity-80"
              />
              Edit
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
        title="Delete Folder"
        message="Are you sure you want to delete this folder? This action cannot be undone."
        confirmLabel={loading ? 'Deleting...' : 'Delete'}
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelAction}
        disabled={loading}
      />

      <EditFormModal
        isOpen={isEditFormOpen}
        onSave={confirmEdit}
        onCancel={cancelEdit}
        title="Edit Folder"
        fields={[
          {
            name: 'folderName',
            label: 'Folder Name',
            initialValue: fileData?.folderName || '',
            placeholder: 'Enter folder name',
            required: true,
          },
        ]}
        confirmLabel={loading ? 'Saving...' : 'Save'}
        cancelLabel="Cancel"
        error={error}
      />
    </>,
    document.body
  );
};

export default FileActionPopup;
