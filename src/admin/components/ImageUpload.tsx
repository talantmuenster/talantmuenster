// Image Upload Component with Firebase Storage

'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  currentImageUrl?: string;
}

export default function ImageUpload({
  onUpload,
  folder = 'uploads',
  maxSizeMB = 5,
  currentImageUrl,
}: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImageUrl || '');

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

    setLoading(true);
    setError('');

    try {
      // Create FormData and upload to API
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload-image', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка при загрузке изображения');
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onUpload(data.url);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setError('Ошибка сети при загрузке');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Изображение</label>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={() => {
              setPreview('');
              onUpload('');
            }}
            className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Upload Area */}
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

      {/* Error */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
