import { api, getAuthHeaders } from './auth';

const withRetry = async (fn, retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries || error.response?.status < 500) throw error;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export const authService = {
  signIn: async ({ email, password }) => {
    const response = await withRetry(() =>
      api.post('/auth/signin', { email, password })
    );
    return response.data;
  },

  signUp: async ({ name, email, password, confirmPassword }) => {
    const response = await withRetry(() =>
      api.post('/auth/signup', { name, email, password, confirmPassword })
    );
    return response.data;
  },

  verifyOTP: async ({ email, code }) => {
    const response = await withRetry(() =>
      api.post('/auth/verify-otp', { email, code })
    );
    return response.data;
  },

  getProfile: async () => {
    try {
      const response = await withRetry(() => api.get('/users/profile/'));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch profile');
    }
  },

  updateProfile: async ({ name, phone, avatar }) => {
    try {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (phone) formData.append('phone', phone);
      if (avatar) formData.append('avatar', avatar);

      const response = await withRetry(() =>
        api.put('/users/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to update profile'
      );
    }
  },

  changePassword: async ({ oldPassword, newPassword }) => {
    try {
      const response = await withRetry(() =>
        api.post('/users/change-password', { oldPassword, newPassword })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to change password'
      );
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await withRetry(() =>
        api.post('/users/forgot-password', { email })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to send reset email'
      );
    }
  },

  resetPassword: async ({ email, otp, newPassword, confirmPassword }) => {
    try {
      const response = await withRetry(() =>
        api.post('/users/reset-password', {
          email,
          otp,
          newPassword,
          confirmPassword,
        })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to reset password'
      );
    }
  },

  getAllUsers: async () => {
    try {
      const response = await withRetry(() => api.get('/users'));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch users');
    }
  },

  getUserById: async (id) => {
    try {
      const response = await withRetry(() => api.get(`/users/${id}`));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch user');
    }
  },

  updateUser: async (id, updateData) => {
    try {
      const response = await withRetry(() =>
        api.put(`/users/${id}`, updateData)
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update user');
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await withRetry(() => api.delete(`/users/${id}`));
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete user');
    }
  },

  createFolder: async ({ folderName }) => {
    try {
      if (!folderName || folderName.length > 100) {
        throw new Error('Folder name must be 1-100 characters');
      }
      const response = await withRetry(() =>
        api.post('/folders/create-folder', { folderName })
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to create folder');
    }
  },

  getAllFolders: async () => {
    try {
      const response = await withRetry(() => api.get('/folders/'));
      const data = response.data?.data || response.data || [];
      return data.map((folder) => ({
        ...folder,
        _id: folder._id,
        fileCount:
          (folder.documents?.length || 0) + (folder.images?.length || 0),
      }));
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch folders');
    }
  },

  getFolderById: async (id) => {
    try {
      const response = await withRetry(() => api.get(`/folders/${id}`));
      const folder = response.data?.data || response.data;
      if (!folder) throw new Error('Folder not found');
      return {
        ...folder,
        _id: folder._id,
        fileCount:
          (folder.documents?.length || 0) + (folder.images?.length || 0),
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to fetch folder');
    }
  },

  updateFolderById: async (id, { folderName }) => {
    try {
      if (!folderName || folderName.length > 100) {
        throw new Error('Folder name must be 1-100 characters');
      }
      const response = await withRetry(() =>
        api.put(`/folders/${id}`, { folderName })
      );
      return response.data?.data || response.data; // Ensure consistent response structure
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to update folder');
    }
  },

  deleteFolderById: async (id) => {
    try {
      const response = await withRetry(() => api.delete(`/folders/${id}`));
      return response.data?.data || response.data; // Ensure consistent response structure
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to delete folder');
    }
  },
  uploadFolder: async (folderId, files) => {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files selected');
      }
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await withRetry(() =>
        api.post(`/folders/upload/${folderId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to upload files to folder'
      );
    }
  },

  downloadFolder: async (id) => {
    try {
      const folder = await authService.getFolderById(id);
      const response = await withRetry(() =>
        api.get(`/folders/download/${id}`, { responseType: 'blob' })
      );
      return { blob: response.data, folderName: folder.folderName };
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to download folder'
      );
    }
  },

  uploadMultipleFolders: async (files) => {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files selected');
      }
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });

      const response = await withRetry(() =>
        api.post('/folders/upload-multiple', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error || 'Failed to upload multiple folders'
      );
    }
  },
};

export { getAuthHeaders };
export default authService;
