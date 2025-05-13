import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/api.service';

export default function useFolderActions({ onClose, fileData, onSuccess }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshFolders = () => {
    window.dispatchEvent(new CustomEvent('refreshFolders'));
  };

  const handleUserAccess = () => {
    navigate('/user-access', {
      state: {
        folderId: fileData._id,
        folderName: fileData.folderName,
        userAccess: fileData.userAccess,
      },
    });
  };

  const handleEdit = () => {
    setIsEditFormOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      setLoading(true);
      console.log('Deleting folder:', fileData._id);
      await authService.deleteFolderById(fileData._id);

      // Force refresh with logging
      console.log('Dispatching refresh after delete');
      window.dispatchEvent(new Event('refreshFolders'));
      setTimeout(() => {
        window.dispatchEvent(new Event('refreshFolders'));
        console.log('Second refresh dispatched');
      }, 300);

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete folder');
    } finally {
      setLoading(false);
    }
  };

  const confirmEdit = async (formData) => {
    try {
      setLoading(true);
      console.log('Updating folder:', fileData._id, 'with:', formData);
      await authService.updateFolderById(fileData._id, formData);

      console.log('Dispatching refresh after update');
      window.dispatchEvent(new Event('refreshFolders'));
      setTimeout(() => {
        window.dispatchEvent(new Event('refreshFolders'));
      }, 300);

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error('Update error:', err);
      setError(err.message || 'Failed to update folder');
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setIsEditFormOpen(false);
    setError(null);
  };

  const cancelAction = () => {
    setIsDeleteModalOpen(false);
    setError(null);
  };

  return {
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
    refreshFolders,
  };
}
