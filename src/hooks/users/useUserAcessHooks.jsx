import { useState, useEffect, useRef } from 'react';

const useUserAccessActions = ({ isOpen, onClose, user, onDelete, onEdit }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEditFormOpen || isDeleteModalOpen) {
        return;
      }

      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isEditFormOpen, isDeleteModalOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsDeleteModalOpen(false);
      setIsEditFormOpen(false);
    }
  }, [isOpen]);

  const handleEdit = () => {
    setIsEditFormOpen(true);
  };

  const confirmEdit = (formData) => {
    console.log(`Editing user ${user.id}:`, formData);
    onEdit(user.id, formData);
    setIsEditFormOpen(false);
    onClose();
  };

  const cancelEdit = () => {
    setIsEditFormOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Deleting user ${user.id}`);
    onDelete(user.id);
    setIsDeleteModalOpen(false);
    onClose();
  };

  const cancelAction = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    popupRef,
    isDeleteModalOpen,
    isEditFormOpen,
    handleEdit,
    confirmEdit,
    cancelEdit,
    handleDelete,
    confirmDelete,
    cancelAction,
  };
};

export default useUserAccessActions;