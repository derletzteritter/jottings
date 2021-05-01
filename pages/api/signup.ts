import { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '../../lib/user';
import { createToken } from '../../lib/utils';
import { setCookie } from '../../lib/cookies';

const maxAge = 3 * 24 * 60 * 60;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;
  try {
    console.log('creating user');
    const user = await createUser(username, password);

    const token = createToken(user.uid);
    setCookie(res, 'jottings', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user.uid });
  } catch (err) {
    console.log('Could not create a user: ', err);
  }
};
