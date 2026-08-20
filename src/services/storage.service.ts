import { useAuthStore } from '../store/auth.store';
import { apiMultipartRequest } from './api';
import { appendImageToFormData } from '../lib/image';

export class StorageService {
  /**
   * Uploads multiple files to the backend /storage/upload-bulk endpoint.
   * Returns an array of uploaded file objects with their S3 keys/URLs.
   */
  static async uploadMultipleFiles(fileUris: string[]): Promise<any[]> {
    if (!fileUris.length) return [];

    const formData = new FormData();

    fileUris.forEach((uri, index) => {
      appendImageToFormData(formData, 'files', uri, `file_${index}.jpg`);
    });

    try {
      const token = useAuthStore.getState().token;
      const result = await apiMultipartRequest('storage/upload-bulk', formData, token);

      if (result.error) {
        throw new Error(result.error);
      }

      return result.data;
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  }
}
