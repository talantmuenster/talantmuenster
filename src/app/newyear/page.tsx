'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 🔒 защита от повторной отправки (даже при reload)
  const hasSubmittedRef = useRef(false);

  // очистка blob URL
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;

    const next = Array.from(list).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...next].slice(0, 20));
    setStatus(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const resetForm = () => {
    setFullName('');
    setAge('');
    setCity('');
    setNomination('');
    setWorkTitle('');
    setEmail('');
    setFiles([]);
    setAgree(false);
    setStatus(null);
    setIsSubmitted(false);
    hasSubmittedRef.current = false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🛑 ГЛАВНЫЙ ФИКС: защита от повторной отправки
    if (isSubmitting || isSubmitted || hasSubmittedRef.current) return;

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
      setStatus('Нужно загрузить хотя бы один файл.');
      return;
    }

    try {
      setIsSubmitting(true);
      hasSubmittedRef.current = true; // 🔒 блокируем повтор

      const fd = new FormData();
      fd.append('fullName', fullName);
      fd.append('age', age);
      fd.append('city', city);
      fd.append('nomination', nomination);
      fd.append('workTitle', workTitle);
      fd.append('email', email);

      files.forEach((pf) => {
        fd.append('files', pf.file);
      });

      const res = await fetch('/api/newyear', {
        method: 'POST',
        body: fd, // ❗ БЕЗ headers
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'Ошибка при отправке');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      hasSubmittedRef.current = false; // разрешаем повтор при ошибке
      setStatus(`Не удалось отправить: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.overlay} />

      <div className={styles.formWrapper}>
        <h1 className={styles.title}>
          Конкурс новогодних игрушек-2025
        </h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>ФИО *</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Возраст *</span>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Населённый пункт *</span>
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Номинация *</span>
            <input value={nomination} onChange={(e) => setNomination(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Название работы *</span>
            <input value={workTitle} onChange={(e) => setWorkTitle(e.target.value)} />
          </label>

          <label className={styles.field}>
            <span>Email *</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          {/* Файлы */}
          <div className={styles.field}>
            <span>Файлы работы *</span>

            <label className={styles.uploadBtn}>
              <input type="file" multiple accept="image/*" onChange={handleFilesChange} />
              Загрузить
            </label>

            {files.length > 0 && (
              <div className={styles.previews}>
                {files.map((pf) => (
                  <div key={pf.id} className={styles.previewItem}>
                    <img src={pf.url} alt={pf.file.name} />
                    <button type="button" onClick={() => removeFile(pf.id)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <span>
              Я согласен(на) с{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                политикой конфиденциальности
              </a>
            </span>
          </label>

          {status && <div className={styles.status}>{status}</div>}

          {isSubmitted ? (
            <div className={styles.afterSubmit}>
              <button
                type="button"
                className={styles.submittedBtn}
                disabled
              >
                ✓ Отправлено
              </button>

              <button
                type="button"
                className={styles.resetBtn}
                onClick={resetForm}
              >
                Отправить ещё анкету
              </button>
            </div>
          ) : (
            <button
              className={styles.submit}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
