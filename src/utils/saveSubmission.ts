import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'submissions.json');

function loadDb() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch {
    return { submissions: [], lastId: 0 };
  }
}

function saveDb(db: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8');
}

export function saveSubmissionToJson({
  text,
  photo,
}: {
  text: string;
  photo?: string | null;
}) {
  const db = loadDb();
  const id = ++db.lastId;
  const submission = {
    id,
    chatId: null, // так как не из Telegram
    text,
    photo: photo || null,
    favorite: false,
    selected: false,
    createdAt: Date.now(),
  };
  db.submissions.push(submission);
  saveDb(db);
  return submission;
}
