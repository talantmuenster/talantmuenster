'use client';

import React, { useState, useEffect } from 'react';
import styles from './NewYearForm.module.scss';

type PreviewFile = {
  id: string;
  file: File;
  url: string;
};

export default function NewYearPage() {
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [nomination, setNomination] = useState('');
  const [workTitle, setWorkTitle] = useState('');
  const [email, setEmail] = useState('');

  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [agree, setAgree] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // очищаем URL превью
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const arr = Array.from(fileList);

    const all = [
      ...files,
      ...arr.map((f) => ({
        id: `${Date.now()}-${Math.random()}`,
        file: f,
        url: URL.createObjectURL(f),
      })),
    ];

    setFiles(all.slice(0, 20));
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!agree) {
      setStatus('Необходимо согласие с политикой конфиденциальности.');
      return;
    }

    if (!fullName || !age || !city || !nomination || !workTitle || !email) {
      setStatus('Заполни, пожалуйста, все обязательные поля.');
      return;
    }

    if (!files.length) {
      setStatus('Нужно выбрать хотя бы один файл (для проверки жюри).');
      return;
    }

    try {
      setIsSubmitting(true);

      // 🔥 ОТПРАВЛЯЕМ ТОЛЬКО JSON
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          age,
          city,
          nomination,
          workTitle,
          email,
          filesCount: files.length, // 👈 просто информация
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      setIsSubmitted(true);
      setFiles([]);
      setFullName('');
      setAge('');
      setCity('');
      setNomination('');
      setWorkTitle('');
      setEmail('');
    } catch (err: any) {
      console.error(err);
      setStatus(`Ошибка: ${err.message || 'не удалось отправить'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Конкурс новогодних игрушек-2025</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ФИО *" />
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Возраст *" />
          <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Город, страна *" />
          <input value={nomination} onChange={(e) => setNomination(e.target.value)} placeholder="Номинация *" />
          <input value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} placeholder="Название работы *" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *" />

          {/* файлы — ТОЛЬКО ДЛЯ UI */}
          <input type="file" multiple accept="image/*" onChange={handleFilesChange} />

          {files.length > 0 && <p>Файлов выбрано: {files.length}</p>}

          <label className={styles.checkbox}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            Я согласен(на) с <a href="/privacy-policy" target="_blank">политикой конфиденциальности</a>
          </label>

          {status && <p className={styles.status}>{status}</p>}

          {isSubmitted ? (
            <p>✅ Заявка отправлена</p>
          ) : (
            <button disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
