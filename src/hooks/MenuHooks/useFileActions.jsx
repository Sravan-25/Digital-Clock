import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../api/api.service';

const useFileActionPopup = ({
  isOpen,
  onClose,
  fileData: passedFileData,
  onEditSuccess,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [fileData, setFileData] = useState(
    passedFileData || { folderName: '' }
  );
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (passedFileData) {
      setFileData(passedFileData);
    }
  }, [passedFileData]);

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

  const handleUserAccess = (e) => {
    e.stopPropagation();
    onClose();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Delete action confirmed');
    setIsDeleteModalOpen(false);
    onClose();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditFormOpen(true);
  };

  const confirmEdit = async (formData) => {
    try {
      if (!fileData?.id) {
        throw new Error('No folder ID provided');
      }

      if (!formData.folderName?.trim()) {
        throw new Error('Folder name cannot be empty');
      }

      setIsEditFormOpen(false);

      const updatedFolder = await authService.updateFolderById(fileData.id, {
        folderName: formData.folderName,
      });

      setFileData((prev) => ({
        ...prev,
        folderName: formData.folderName,
      }));

      if (onEditSuccess) {
        await onEditSuccess();
      }

      onClose();

      alert('Folder updated successfully!');

      return updatedFolder;
    } catch (error) {
      setIsEditFormOpen(true);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Failed to update folder';

      console.error('Error updating folder:', {
        error,
        folderId: fileData?.id,
        formData,
      });

      // User-friendly error message
      alert(`Error: ${errorMessage}`);

      // Re-throw for potential error boundaries
      throw error;
    }
  };

  const cancelEdit = () => {
    setIsEditFormOpen(false);
  };

  const cancelAction = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    popupRef,
    isDeleteModalOpen,
    isEditFormOpen,
    fileData,
    handleUserAccess,
    handleDelete,
    confirmDelete,
    handleEdit,
    confirmEdit,
    cancelEdit,
    cancelAction,
  };
};

export default useFileActionPopup;
