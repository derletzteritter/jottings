import { NextApiRequest, NextApiResponse } from 'next';
import { promisePool } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body);
  await promisePool.query('DELETE FROM notes WHERE id = ?', [id]);
  res.status(200).json({ message: 'Note was successfully deleted!' });
};
