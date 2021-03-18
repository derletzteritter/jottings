import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { promisePool } from '../../utils/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = JSON.parse(req.body);
  const encryptedPassword = await getEncryptedPassword(username);

  await bcrypt.compare(password, encryptedPassword, (err, same) => {
    // sending result back
    console.log(same);
  });
};

async function getEncryptedPassword(username: string): Promise<string> {
  const [
    results,
  ] = await promisePool.query('SELECT password FROM users WHERE username = ?', [
    username,
  ]);
  const result = <any>results;

  return result[0].password;
}
