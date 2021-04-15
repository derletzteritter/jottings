import { NextApiRequest, NextApiResponse } from 'next';
import { findUser } from '../../lib/user';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // This is big broken
    const session = await getLoginSession(req);
    const user = (session && (await findUser(session))) ?? null;

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).end('Authentication token is invalid, please log in');
  }
};
