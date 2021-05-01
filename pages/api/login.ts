import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '../../lib/cookies';
import { handleLogin } from '../../lib/user';
import { createToken } from '../../lib/utils';

const maxAge = 3 * 24 * 60 * 60;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    const user = await handleLogin(username, password);
    console.log(user);

    const token = createToken(user.uid);
    setCookie(res, 'jottings', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user.uid, redirect: '/notes' });
  } catch (err) {
    console.log(err.message);
  }
};
