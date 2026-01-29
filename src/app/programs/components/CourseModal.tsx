'use client';

import { useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CourseModal({ open, onClose }: Props) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[420px] mx-4 rounded-3xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Записаться на курс
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <form className="space-y-4">
          {/* Course */}
          <Field label="Курс">
            <Select value="Акварельная живопись" />
          </Field>

          {/* Day */}
          <Field label="Выбранный день">
            <Select value="ПН, 15:00" />
          </Field>

          <Field label="Имя">
            <Input placeholder="Имя" />
          </Field>

          <Field label="Номер телефона">
            <Input placeholder="Номер телефона" />
          </Field>

          <Field label="Электронная почта">
            <Input placeholder="Электронная почта" />
          </Field>

          <Field label="Сообщение">
            <textarea
              placeholder="Сообщение"
              className="w-full h-24 rounded-xl border border-blue-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
            />
          </Field>

          {/* Checkbox */}
          <label className="flex items-start gap-3 text-sm text-gray-700">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              Я согласен(на) на обработку моих данных в соответствии с{' '}
              <a href="#" className="text-blue-600 underline">
                Политикой конфиденциальности
              </a>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 rounded-full bg-blue-900 py-3 text-white font-medium hover:bg-blue-800 transition"
          >
            Записаться на курс
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
