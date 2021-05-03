import { promisePool } from '../utils/db';
import { Note } from '../types/notes';

export const handleCreateNote = async (
  uid: string,
  title: string,
  content: string,
) => {
  await promisePool.query(
    `INSERT INTO notes (uid, title, content) VALUES (?, ?, ?)`,
    [uid, title, content],
  );
};

export const handleGetNotes = async (uid: string): Promise<Note[]> => {
  const [results] = await promisePool.query(
    `SELECT * FROM notes WHERE uid = ?`,
    [uid],
  );
  return <Note[]>results;
};
