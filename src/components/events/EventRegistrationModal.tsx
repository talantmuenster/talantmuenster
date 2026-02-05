'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/Button';

type EventRegistrationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  eventId: string;
  events?: Array<{ id: string; title: string }>;
};

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventTitle,
  eventId,
  events = [],
}: EventRegistrationModalProps) {
  const [selectedEventId, setSelectedEventId] = useState(eventId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (eventId) {
      setSelectedEventId(eventId);
    }
  }, [eventId, isOpen]);

  const validateName = (name: string): string => {
    if (!name.trim()) return 'Имя обязательно';
    if (name.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
    if (!/^[а-яА-ЯёЁa-zA-Z\s-]+$/.test(name)) return 'Имя может содержать только буквы';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone.trim()) return 'Телефон обязателен';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length < 10) return 'Введите корректный номер телефона';
    if (cleaned.length > 12) return 'Номер телефона слишком длинный';
    return '';
  };

  const validateEmail = (email: string): string => {
    if (!email.trim()) return 'Email обязателен';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Введите корректный email';
    return '';
  };

  const handleBlur = (field: 'name' | 'phone' | 'email') => {
    setTouched({ ...touched, [field]: true });
    
    let error = '';
    if (field === 'name') error = validateName(formData.name);
    if (field === 'phone') error = validatePhone(formData.phone);
    if (field === 'email') error = validateEmail(formData.email);
    
    setErrors({ ...errors, [field]: error });
  };

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
    
    // Real-time validation only for touched fields
    if (touched[field as keyof typeof touched]) {
      let error = '';
      if (field === 'name') error = validateName(value as string);
      if (field === 'phone') error = validatePhone(value as string);
      if (field === 'email') error = validateEmail(value as string);
      setErrors({ ...errors, [field]: error });
    }
  };

  const isFormValid = (): boolean => {
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    
    return !nameError && !phoneError && !emailError && formData.consent;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const nameError = validateName(formData.name);
    const phoneError = validatePhone(formData.phone);
    const emailError = validateEmail(formData.email);
    
    setErrors({ name: nameError, phone: phoneError, email: emailError });
    setTouched({ name: true, phone: true, email: true });
    
    if (!isFormValid()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/event-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventId: selectedEventId,
          eventTitle: events.find(e => e.id === selectedEventId)?.title || eventTitle,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Registration failed:', errorData);
        throw new Error(errorData.error || 'Failed to submit');
      }

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', message: '', consent: false });
      setErrors({ name: '', phone: '', email: '' });
      setTouched({ name: false, phone: false, email: false });
      setTimeout(() => {
        onClose();
        setSubmitStatus('idle');
      }, 2000);
    } catch (error: any) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', email: '', message: '', consent: false });
    setErrors({ name: '', phone: '', email: '' });
    setTouched({ name: false, phone: false, email: false });
    setSubmitStatus('idle');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 ">
          <h3 className="text-2xl font-semibold text-primary">
            Записаться на мероприятие
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
          {/* Event Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Мероприятие
            </label>
            {events.length > 0 ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <span className="text-gray-900">
                    {events.find(e => e.id === selectedEventId)?.title || eventTitle}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => {
                          setSelectedEventId(event.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition ${
                          event.id === selectedEventId
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-900'
                        }`}
                      >
                        {event.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <input
                type="text"
                value={eventTitle}
                disabled
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
              />
            )}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <input
              type="text"
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                touched.name && errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {touched.name && errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Номер телефона
            </label>
            <input
              type="tel"
              placeholder="Номер телефона"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                touched.phone && errors.phone
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {touched.phone && errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Электронная почта
            </label>
            <input
              type="email"
              placeholder="Электронная почта"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                touched.email && errors.email
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
            />
            {touched.email && errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сообщение
            </label>
            <textarea
              placeholder="Сообщение"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="consent"
              checked={formData.consent}
              onChange={(e) => handleChange('consent', e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="consent" className="text-sm text-gray-600">
              Даю согласие на обработку данных
            </label>
          </div>

          {/* Submit Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              ✓ Регистрация успешно отправлена!
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              Ошибка отправки. Попробуйте снова.
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="md"
            variant="primary"
            disabled={isSubmitting || !isFormValid()}
            className="w-full justify-center"
          >
            {isSubmitting ? 'Отправка...' : 'Записаться на курс'}
          </Button>
        </form>
      </div>
    </div>
  );
}
