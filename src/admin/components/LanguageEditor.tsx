// Language Editor Component - for 3-language content editing

'use client';

import { useState } from 'react';
import { LocalizedContent, Locale } from '../types';

interface LanguageEditorProps {
  content: LocalizedContent;
  onChange: (content: LocalizedContent) => void;
  fieldName: string;
  isTextarea?: boolean;
  rows?: number;
  placeholder?: string;
}

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
];

export default function LanguageEditor({
  content,
  onChange,
  fieldName,
  isTextarea = false,
  rows = 6,
  placeholder = '',
}: LanguageEditorProps) {
  const [activeLanguage, setActiveLanguage] = useState<Locale>('ru');

  const handleContentChange = (value: string) => {
    onChange({
      ...content,
      [activeLanguage]: value,
    });
  };

  return (
    <div className="space-y-4">
      {/* Language Tabs */}
      <div className="flex gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveLanguage(lang.code)}
            className={`px-3 py-2 text-sm rounded-md flex items-center gap-2 transition-all ${
              activeLanguage === lang.code
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {fieldName} ({languages.find((l) => l.code === activeLanguage)?.name})
        </label>
        {isTextarea ? (
          <textarea
            value={content[activeLanguage] || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        ) : (
          <input
            type="text"
            value={content[activeLanguage] || ''}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        )}
      </div>

      {/* Preview of all languages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-md border border-gray-200">
        {languages.map((lang) => (
          <div key={lang.code} className="space-y-1">
            <div className="text-xs font-medium text-gray-600 flex items-center gap-1">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
            <div className="text-sm text-gray-800 min-h-[40px] p-2 bg-white rounded border border-gray-100 line-clamp-2">
              {content[lang.code] || <span className="text-gray-400 italic">Не заполнено</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
