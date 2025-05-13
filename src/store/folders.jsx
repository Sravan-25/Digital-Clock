import create from 'zustand';
import authService from '../api/api.service';

export const useFolderStore = create((set) => ({
  folders: [],
  loading: false,
  error: null,
  fetchFolders: async () => {
    try {
      set({ loading: true, error: null });
      const data = await authService.getAllFolders();
      set({ folders: data, loading: false });
    } catch (err) {
      set({ error: err.message || 'Failed to fetch folders', loading: false });
    }
  },
  refreshFolders: () => {
    setTimeout(() => useFolderStore.getState().fetchFolders(), 0); // Async execution
  },
}));
