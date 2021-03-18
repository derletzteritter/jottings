import { NextApiRequest, NextApiResponse } from 'next';
import { promisePool } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [results] = await promisePool.query('SELECT * FROM notes');
  const notes = <any[]>results;
  res.status(200).json(notes);
};
