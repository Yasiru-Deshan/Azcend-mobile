import { appendImageToFormData } from '../lib/image';
import { useAuthStore } from '../store/auth.store';
import { apiMultipartRequest, apiRequest } from './api';

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

  /**
   * Fetches a fresh signed URL for a given S3 key.
   */
  static async getSignedUrl(key: string): Promise<string> {
    if (key.startsWith('http')) return key;

    const token = useAuthStore.getState().token;
    const result = await apiRequest<{ signedUrl: string }>(
      `storage/signed-url?key=${encodeURIComponent(key)}`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      },
    );

    if (result.error || !result.data?.signedUrl) {
      throw new Error(result.error ?? 'Failed to fetch signed URL');
    }

    return result.data.signedUrl;
  }
}
