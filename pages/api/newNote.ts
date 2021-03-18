import { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../utils/db";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { title, content } = JSON.parse(req.body);
	console.log(title, content);
	await promisePool.query(`INSERT INTO notes (title, content) VALUES (?, ?)`, [title, content]);
	res.status(200).json({ message: 'Note successfully saved!'})
}