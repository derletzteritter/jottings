import { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../utils/db";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { username, password } = JSON.parse(req.body);

	await bcrypt.genSalt(10, async (err, salt) => {
		await bcrypt.hash(password, salt, async (err, hash) => {
			// stores the user once the hash is created.
			await promisePool.query("INSERT INTO users (uid, username, password) VALUES (?, ?, ?)", [uuidv4(), username, hash])
		})
	})

	res.send('USER CREATED')
}