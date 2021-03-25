import bcrypt from 'bcrypt';
import { promisePool } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';

interface User {
  username: string;
  password: string;
}

export const createUser = async ({ username, password }: User) => {
  await bcrypt.genSalt(10, async (err, salt) => {
    await bcrypt.hash(password, salt, async (err, hash) => {
      // stores the user once the hash is created.
      await promisePool.query(
        'INSERT INTO users (uid, username, password) VALUES (?, ?, ?)',
        [uuidv4(), username, hash],
      );
    });
  });

  return { username, createdAt: Date.now() };
};
