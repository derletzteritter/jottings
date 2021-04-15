import { promisePool } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

interface User {
  username: string;
  password: string;
}

interface UserLogged {
  username: string;
  password: string;
  hash: string;
  salt: any;
}

export const createUser = async ({ username, password }: User) => {
  bcrypt.hash(password, 10, async (err, hash) => {
    await promisePool.query(
      'INSERT INTO users (uid, username, password) VALUES (?, ?, ?)',
      [uuidv4(), username, hash],
    );
  });
};

export async function findUser({ username }: { username: string }) {
  const [
    results,
  ] = await promisePool.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);
  const result = <any[]>results;
  console.log(result);
  return result[0];
}
