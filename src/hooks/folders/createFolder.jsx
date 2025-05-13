import { useState, useEffect, useRef } from 'react';
import useFetchUsers from '../users/useFetchUsers';
import { authService } from '../../api/api.service';

export default function useFolderForm(navigate) {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ folderName: '' });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [openUserAccessId, setOpenUserAccessId] = useState(null);
  const [triggerPositions, setTriggerPositions] = useState({});
  const { users, loading: usersLoading } = useFetchUsers();
  const [userList, setUserList] = useState(users);
  const buttonRefs = useRef({});

  useEffect(() => setUserList(users), [users]);

  useEffect(() => {
    const handleScroll = () => {
      if (openUserAccessId && buttonRefs.current[openUserAccessId]) {
        const button = buttonRefs.current[openUserAccessId];
        const rect = button.getBoundingClientRect();
        setTriggerPositions((prev) => ({
          ...prev,
          [openUserAccessId]: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        }));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openUserAccessId]);

  const sanitizeFolderName = (name) => {
    return name.replace(/[<>"'\/\\|?*]/g, '').trim();
  };

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    setError({ folderName: '' });
    setLoading(true);

    const sanitizedName = folderName.trim();
    if (!sanitizedName) {
      setError({ folderName: 'Folder name is required' });
      setLoading(false);
      return;
    }

    try {
      console.log('Creating folder:', sanitizedName);
      const response = await authService.createFolder({
        folderName: sanitizedName,
      });
      console.log('Creation response:', response);

      window.dispatchEvent(new Event('refreshFolders'));
      setTimeout(() => {
        window.dispatchEvent(new Event('refreshFolders'));
      }, 500);

      navigate('/home');
    } catch (error) {
      console.error('Creation error:', error);
      setError({
        folderName: error.response?.data?.message || 'Failed to create folder',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAddUser = () => setIsAddUserOpen((prev) => !prev);

  const handleSaveUser = (formData) => {
    const newUser = {
      id: userList.length + 1,
      email: formData.email,
      role: formData.permission?.label || formData.role || 'Read Only',
    };
    setUserList((prev) => [...prev, newUser]);
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (userId) => {
    setUserList((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleEditUser = (userId, updatedData) => {
    setUserList((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    setOpenUserAccessId(null);
  };

  const handleToggleUserAccess = (userId) => {
    if (openUserAccessId === userId) {
      setOpenUserAccessId(null);
    } else {
      const button = buttonRefs.current[userId];
      if (button) {
        const rect = button.getBoundingClientRect();
        setTriggerPositions((prev) => ({
          ...prev,
          [userId]: {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          },
        }));
      }
      setOpenUserAccessId(userId);
    }
  };

  return {
    folderName,
    setFolderName,
    loading,
    error,
    handleCreateFolder,
    isAddUserOpen,
    handleToggleAddUser,
    handleSaveUser,
    openUserAccessId,
    triggerPositions,
    usersLoading,
    userList,
    handleDeleteUser,
    handleEditUser,
    handleToggleUserAccess,
    buttonRefs,
    setOpenUserAccessId,
  };
}
