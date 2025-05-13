import { useState, useEffect, useCallback } from 'react';
import authService from '../../api/api.service';

const useFetchFolders = () => {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFolders = useCallback(async () => {
    console.log('Starting folder fetch...');
    try {
      setLoading(true);
      const response = await authService.getAllFolders();
      console.log('API Response:', response);

      // Handle different response formats
      const receivedFolders = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
        ? response
        : [];

      console.log('Processed folders:', receivedFolders);
      setFolders(
        receivedFolders.map((folder) => ({
          ...folder,
          fileCount:
            (folder.documents?.length || 0) + (folder.images?.length || 0),
        }))
      );
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Failed to fetch folders');
    } finally {
      setLoading(false);
    }
  }, []);

  // Set up refresh event listener
  useEffect(() => {
    console.log('Setting up folder refresh listener');
    const handleRefresh = () => {
      console.log('Refresh event triggered - fetching folders');
      fetchFolders();
    };

    // Initial fetch
    fetchFolders();

    window.addEventListener('refreshFolders', handleRefresh);
    return () => {
      console.log('Cleaning up folder refresh listener');
      window.removeEventListener('refreshFolders', handleRefresh);
    };
  }, [fetchFolders]);

  return {
    folders,
    loading,
    error,
    refreshFolders: fetchFolders,
  };
};

export default useFetchFolders;
