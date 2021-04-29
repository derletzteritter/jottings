import bcrypt from 'bcrypt';
import { promisePool } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';

export const createUser = async (
  username: string,
  password: string,
): Promise<any> => {
  try {
    const salt = await bcrypt.genSalt();
    const uid = uuidv4();
    // remember this chip
    const encPassowrd = await bcrypt.hash(password, salt);

    const [
      results,
    ] = await promisePool.query(
      `INSERT INTO users (uid, username, password) VALUES (?, ?, ?)`,
      [uid, username, encPassowrd],
    );

    const result = <any>results;
    const user = await getUser(result.insertId);

    if (user) {
      return user;
    }
  } catch (err) {
    console.log(err.message);
  }
};

export const getUser = async (id: number): Promise<any> => {
  const query = 'SELECT * FROM users WHERE id = ?';
  const [results] = await promisePool.query(query, [id]);
  const users = <any[]>results;
  const user = users[0];
  return user;
};
