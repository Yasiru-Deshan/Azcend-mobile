/**
 * Resolves the correct MIME type for a local image URI.
 * Apple devices often produce HEIC/HEIF files whose filenames keep the
 * original extension even after expo-image-picker transcodes the pixels
 * to JPEG. Sending "image/heic" to a server or S3 bucket typically causes
 * a rejection, so we normalise those to "image/jpeg".
 */
export function getMimeTypeFromUri(uri: string): string {
  const filename = uri.split('/').pop() ?? '';
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1].toLowerCase() : 'jpeg';
  return ext === 'heic' || ext === 'heif' ? 'image/jpeg' : `image/${ext}`;
}

/**
 * Appends an image URI to a FormData object with the correct filename and
 * MIME type, using the React Native FormData shape.
 *
 * @param formData - The FormData instance to append to.
 * @param fieldName - The form field name (e.g. "front", "files").
 * @param uri      - The local image URI returned by expo-image-picker.
 * @param fallbackFilename - Used when the URI has no filename segment.
 */
export function appendImageToFormData(
  formData: FormData,
  fieldName: string,
  uri: string,
  fallbackFilename?: string,
): void {
  const filename = uri.split('/').pop() || fallbackFilename || `${fieldName}.jpg`;
  const type = getMimeTypeFromUri(uri);

  // @ts-ignore - React Native FormData expects { uri, name, type }
  formData.append(fieldName, { uri, name: filename, type });
}
