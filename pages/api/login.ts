import { NextApiRequest, NextApiResponse } from 'next';
import { handleLogin } from '../../lib/user';

// uhhh..whats going on here?
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    const user = await handleLogin(username, password);

    res.status(201).json({ user: user.uid });
  } catch (err) {
    console.log(err.message);
  }
};
