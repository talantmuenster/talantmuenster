// Image Upload Component with Firebase Storage

'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  currentImageUrl?: string;
  previewSizeClass?: string;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
}

export default function ImageUpload({
  onUpload,
  folder = 'uploads',
  maxSizeMB = 5,
  currentImageUrl,
  previewSizeClass = 'w-full h-48',
  onUploadStart,
  onUploadEnd,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImageUrl || '');
  const [progress, setProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Файл слишком большой. Максимум ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Это не изображение. Загружайте JPG, PNG или WebP');
      return;
    }

    onUploadStart?.();
    setLoading(true);
    setProgress(0);
    setUploadComplete(false);
    setError('');

    try {
      // Create FormData and upload to API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 90));
      }, 300);

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      clearInterval(progressInterval);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка при загрузке изображения');
        setProgress(0);
        onUploadEnd?.();
        return;
      }

      // Create local preview from the uploaded file
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setProgress(100);
        setUploadComplete(true);
        
        // Call onUpload with the SERVER URL (not the local preview)
        console.log('Image uploaded, calling onUpload with:', data.url);
        onUpload(data.url);
        onUploadEnd?.();
      };
      reader.readAsDataURL(file);
    } catch (err: unknown) {
      setError('Ошибка сети при загрузке');
      setProgress(0);
      console.error(err);
      onUploadEnd?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Изображение</label>

      {/* Preview */}
      {preview && (
        <div className={`relative ${previewSizeClass} rounded-lg overflow-hidden border border-gray-300`}>
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {uploadComplete && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ✓ Загружено
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setPreview('');
              setProgress(0);
              setUploadComplete(false);
              onUpload('');
            }}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Area */}
      {loading && (
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center text-gray-600">
            Загружается... {progress}%
          </p>
        </div>
      )}

      {!preview && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer"
          >
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm text-gray-600">
              {loading ? 'Загрузка...' : 'Нажмите или перетащите изображение'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Максимум {maxSizeMB}MB, JPG/PNG/WebP
            </p>
          </label>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
