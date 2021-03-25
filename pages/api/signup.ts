import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../lib/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = JSON.parse(req.body);
  try {
    await createUser({ username, password });
    res.status(200).send({ data: true });
  } catch (err) {
    console.log(err.message);
  }
};
