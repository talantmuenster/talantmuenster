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


  // очищаем URL’ы
  useEffect(() => {
    return () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
    };
  }, [files]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    const arr = Array.from(fileList);

    // лимит – 20 файлов, ~20 МБ
    const all = [...files, ...arr.map((f) => ({
      id: `${Date.now()}-${f.name}-${Math.random()}`,
      file: f,
      url: URL.createObjectURL(f),
    }))];

    setFiles(all.slice(0, 20));
    setStatus(null);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const next = prev.filter((f) => f.id !== id);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!fullName || !age || !city || !nomination || !workTitle || !email) {
      setStatus('Заполни, пожалуйста, все обязательные поля.');
      return;
    }

    if (!files.length) {
      setStatus('Нужно загрузить хотя бы один файл работы.');
      return;
    }

    try {
      setIsSubmitting(true);

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
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Ошибка при отправке');
      }

      setStatus('Заявка отправлена! Спасибо 💚');
      setFullName('');
      setAge('');
      setCity('');
      setNomination('');
      setWorkTitle('');
      setEmail('');
      setFiles([]);
    } catch (err: any) {
      console.error(err);
      setStatus(`Не удалось отправить: ${err.message || 'ошибка'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filesCount = files.length;

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
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Возраст *</span>
            <input
              type="number"
              min={0}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Населённый пункт, страна *</span>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Номинация *</span>
            <input
              type="text"
              value={nomination}
              onChange={(e) => setNomination(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Название работы *</span>
            <input
              type="text"
              value={workTitle}
              onChange={(e) => setWorkTitle(e.target.value)}
              required
            />
          </label>

          <label className={styles.field}>
            <span>Электронная почта для связи *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          {/* Загрузка файлов */}
          <div className={styles.field}>
            <span>Файлы работы *</span>

            <label className={styles.uploadBtn}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
              />
              Загрузить
            </label>

            <p className={styles.filesHint}>
              До 20 файлов, общий размер до 20 МБ.
            </p>

            {filesCount > 0 && (
              <div className={styles.filesStatus}>
                ✅ Файлы выбраны: {filesCount}
              </div>
            )}

            {/* Превью */}
            {filesCount > 0 && (
              <div className={styles.previews}>
                {files.map((pf) => (
                  <div key={pf.id} className={styles.previewItem}>
                    <img src={pf.url} alt={pf.file.name} />
                    <button
                      type="button"
                      onClick={() => removeFile(pf.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {status && <div className={styles.status}>{status}</div>}
			<label className={styles.checkbox}>
			<input
				type="checkbox"
				checked={agree}
				onChange={(e) => setAgree(e.target.checked)}
				required
			/>
			<span>
				Я согласен(на) с{' '}
				<a
				href="/privacy-policy"
				target="_blank"
				rel="noopener noreferrer"
				>
				политикой конфиденциальности
				</a>
			</span>
			</label>

          <button
            className={styles.submit}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправляем…' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </div>
  );
}
