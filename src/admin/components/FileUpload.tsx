'use client';

import { useState } from 'react';

interface FileUploadProps {
  onUpload: (url: string) => void;
  folder?: string;
  maxSizeMB?: number;
  currentUrl?: string;
  accept?: string;
}

export default function FileUpload({
  onUpload,
  folder = 'documents',
  maxSizeMB = 20,
  currentUrl,
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg',
}: FileUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`Файл слишком большой. Максимум ${maxSizeMB}MB`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const res = await fetch('/api/admin/upload-file', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ошибка при загрузке файла');
        return;
      }

      setFileName(file.name);
      onUpload(data.url);
    } catch (err: any) {
      setError('Ошибка сети при загрузке');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">Файл</label>

      {currentUrl && (
        <div className="text-sm text-gray-700">
          Текущий файл: <a href={currentUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">Открыть</a>
        </div>
      )}

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={loading}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-4xl mb-2">📄</div>
          <p className="text-sm text-gray-600">
            {loading ? 'Загрузка...' : 'Нажмите или перетащите файл'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Максимум {maxSizeMB}MB
          </p>
        </label>
      </div>

      {fileName && (
        <div className="text-sm text-green-700">Файл загружен: {fileName}</div>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
          ❌ {error}
        </div>
      )}
    </div>
  );
}
