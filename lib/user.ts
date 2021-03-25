import { promisePool } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

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
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 12, 'sha512')
    .toString('hex');

  await promisePool.query(
    'INSERT INTO users (uid, username, password, salt) VALUES (?, ?, ?, ?)',
    [uuidv4(), username, hash, salt],
  );

  return { username };
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

export const validatePassword = (user: UserLogged, inputPassword: string) => {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 12, 'sha512')
    .toString('hex');

  return user.hash === inputHash;
};
