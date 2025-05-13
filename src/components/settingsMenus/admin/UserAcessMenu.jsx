import React from 'react';
import { createPortal } from 'react-dom';
import ModernPopupCard from '../../../components/cards/popUpCard';
import EditFormModal from '../../cards/EditUserModel';
import editIcon from '../../../assets/edit.png';
import deleteIcon from '../../../assets/delete.png';
import useUserAccessActions from '../../../hooks/users/useUserAcessHooks';

const UserAccessMenu = ({
  isOpen,
  onClose,
  triggerPosition,
  user,
  onDelete,
  onEdit,
}) => {
  const {
    popupRef,
    isDeleteModalOpen,
    isEditFormOpen,
    handleEdit,
    confirmEdit,
    cancelEdit,
    handleDelete,
    confirmDelete,
    cancelAction,
  } = useUserAccessActions({ isOpen, onClose, user, onDelete, onEdit });

  const calculatePosition = () => {
    if (!triggerPosition) return { top: '50%', left: '50%' };

    const { x, y, width, height } = triggerPosition;
    const popupWidth = 200;
    const popupHeight = 120;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const adjustedX = x + scrollX;
    const adjustedY = y + scrollY;

    let left = adjustedX;
    let top = adjustedY + height + 5;

    if (left + popupWidth > viewportWidth - 20) {
      left = viewportWidth - popupWidth - 20;
    }

    if (top + popupHeight > viewportHeight - 20) {
      top = adjustedY - popupHeight - 5;
    }

    if (left < 10) {
      left = 10;
    }
    if (top < 10) {
      top = 10;
    }

    return { top: `${top}px`, left: `${left}px` };
  };

  if (!isOpen) return null;

  const position = calculatePosition();

  const popupContent = (
    <>
      {!isEditFormOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40"
          onClick={onClose}
        ></div>
      )}
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
              onClick={handleEdit}
              className="w-full flex items-center text-left px-6 py-3 text-gray-900 hover:bg-gray-100 transition-colors duration-200 rounded-t-2xl"
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelAction}
      />

      <EditFormModal
        isOpen={isEditFormOpen}
        onSave={confirmEdit}
        onCancel={cancelEdit}
        title="Edit User"
        fields={[
          {
            name: 'role',
            initialValue: user.role,
            placeholder: 'Enter user role',
            required: true,
          },
        ]}
        confirmLabel="Save"
      />
    </>
  );

  return createPortal(popupContent, document.body);
};

export default UserAccessMenu;
