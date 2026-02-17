'use client';

import { useEffect, useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

type CourseOption = {
  title: { ru: string; en: string; de: string };
};

type Props = {
  open: boolean;
  onClose: () => void;
  courses?: CourseOption[];
  courseTitle?: string;
  locale?: 'ru' | 'en' | 'de';
};

export default function CourseModal({ 
  open, 
  onClose, 
  courses = [], 
  courseTitle = 'Курс',
  locale = 'ru'
}: Props) {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      // Установить первый курс по умолчанию
      if (courses.length > 0) {
        const courseTitle = courses[0].title[locale] || courses[0].title.ru;
        setSelectedCourse(courseTitle);
      } else {
        setSelectedCourse(courseTitle);
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, courses, courseTitle, locale]);

  const getText = (value: { ru: string; en: string; de: string }) => 
    value[locale as keyof typeof value] || value.ru;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      consent: e.target.checked
    }));
  };

  const handleSelectCourse = (courseName: string) => {
    setSelectedCourse(courseName);
    setIsDropdownOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!formData.consent) {
      alert('Пожалуйста, согласитесь с обработкой данных');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/event-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          courseTitle: selectedCourse,
          type: 'course'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          message: '',
          consent: false,
        });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 rounded-3xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Записаться на курс
          </h2>
          <button onClick={onClose} className="flex-shrink-0">
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Course Select with Dropdown */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Курс
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-sm text-left bg-white hover:border-gray-400 transition flex items-center justify-between"
              >
                <span>{selectedCourse}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-gray-400 transition ${isDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>
              
              {isDropdownOpen && courses.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-2xl shadow-lg z-10">
                  {courses.map((course, index) => {
                    const courseText = getText(course.title);
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelectCourse(courseText)}
                        className={`w-full px-4 py-3 text-sm text-left transition ${
                          selectedCourse === courseText
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-gray-100'
                        } ${index === courses.length - 1 ? '' : 'border-b border-gray-200'}`}
                      >
                        {courseText}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <Field label="Имя">
            <Input 
              placeholder="Имя" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field label="Номер телефона">
            <Input 
              placeholder="Номер телефона" 
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field label="Электронная почта">
            <Input 
              placeholder="Электронная почта" 
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Field>

          <Field label="Сообщение">
            <textarea
              placeholder="Сообщение"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full h-24 rounded-xl border border-blue-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </Field>

          {/* Checkbox */}
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={handleCheckboxChange}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              Я согласен(на) на обработку моих данных в соответствии с{' '}
              <a href="/privacy-policy" className="text-blue-600 underline">
                Политикой конфиденциальности
              </a>
            </span>
          </label>

          {/* Status Message */}
          {submitStatus === 'success' && (
            <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
              ✓ Спасибо! Ваша заявка принята
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              ✗ Ошибка при отправке. Попробуйте позже
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 rounded-full bg-blue-900 py-3 text-white font-medium hover:bg-blue-800 transition disabled:opacity-50"
          >
            {isSubmitting ? 'Отправка...' : 'Записаться на курс'}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ===== Helpers ===== */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-blue-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}

function Select({ value }: { value: string }) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none rounded-xl border border-blue-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option>{value}</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
}
