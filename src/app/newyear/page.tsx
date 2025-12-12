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

  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list) return;

    const arr = Array.from(list);

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
      setStatus('Нужно загрузить хотя бы один файл.');
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch('/api/newyear', {
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
          filesCount: files.length,
        }),
      });

      const text = await res.text();
      let data: any;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error('Сервер вернул не JSON');
      }

      if (!data.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      setIsSubmitted(true);
      setFullName('');
      setAge('');
      setCity('');
      setNomination('');
      setWorkTitle('');
      setEmail('');
      setFiles([]);
    } catch (err: any) {
      console.error(err);
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

          <div className={styles.field}>
            <span>Файлы *</span>
            <label className={styles.uploadBtn}>
              <input type="file" multiple accept="image/*" onChange={handleFilesChange} />
              Загрузить
            </label>

            {files.length > 0 && (
              <div className={styles.previews}>
                {files.map((pf) => (
                  <div key={pf.id} className={styles.previewItem}>
                    <img src={pf.url} alt="" />
                    <button type="button" onClick={() => removeFile(pf.id)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className={styles.checkbox}>
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
            <span>
              Я согласен(на) с{' '}
              <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                политикой конфиденциальности
              </a>
            </span>
          </label>

          {status && <div className={styles.status}>{status}</div>}

          {isSubmitted ? (
            <div className={styles.submitted}>✅ Заявка отправлена</div>
          ) : (
            <button className={styles.submit} disabled={isSubmitting}>
              {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
