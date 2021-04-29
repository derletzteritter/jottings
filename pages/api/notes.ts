import { NextApiRequest, NextApiResponse } from 'next';
import { promisePool } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uid } = req.body;
  const [results] = await promisePool.query(
    'SELECT * FROM notes WHERE uid = ?',
    [uid],
  );
  const notes = <any[]>results;

  res.status(200).json(notes);
};
