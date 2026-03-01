'use client';

import { useEffect, useState } from 'react';

interface ImageUploadProps {
  folder?: string;
  maxSizeMB?: number;
  currentImageUrl?: string;
  onUpload?: (url: string) => void;
}

export default function ImageUpload({
  folder = 'uploads',
  maxSizeMB = 5,
  currentImageUrl,
  onUpload,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  // Обновляем preview если изменился currentImageUrl
  useEffect(() => {
    if (currentImageUrl) {
      setPreview(currentImageUrl);
    } else {
      setPreview('');
    }
  }, [currentImageUrl]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Проверка размера
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Максимальный размер ${maxSizeMB}MB`);
      return;
    }

    // Проверка типа
    if (!file.type.startsWith('image/')) {
      setError('Можно загружать только изображения');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setProgress(10); 

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setProgress(70);


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка загрузки');
      }

      setPreview(data.url);
      setProgress(100);
      onUpload?.(data.url);

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка загрузки');
      setProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (!preview) return;

    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: preview }),
      });

      setPreview('');
      setProgress(0);
      onUpload?.('');

    } catch (err) {
      console.error(err);
      setError('Ошибка удаления');
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Изображение
      </label>

      {preview ? (
        <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-300">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
          >
            ✕
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="hidden"
            id="image-upload"
          />

          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="text-4xl mb-2">📸</div>
            <p className="text-sm">
              {loading ? 'Загрузка...' : 'Нажмите для загрузки'}
            </p>
            <p className="text-xs text-gray-500">
              JPG / PNG / WebP до {maxSizeMB}MB
            </p>
          </label>
        </div>
      )}

      {loading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}