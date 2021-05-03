import { NextApiRequest, NextApiResponse } from 'next';
import { handleCreateNote, handleGetNotes } from '../../lib/notes';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid, title, content } = req.body;
  await handleCreateNote(uid, title, content);

  res.status(200).json({ message: 'Created a new note!' });
};
