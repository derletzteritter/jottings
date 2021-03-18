import { NextApiRequest, NextApiResponse } from "next";
import { promisePool } from "../../utils/db";


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { id, title, text } = JSON.parse(req.body);
	console.log(title, text);
	 await promisePool.query(`UPDATE notes SET title = ?, content = ? WHERE id = ?`, [title, text, id]);
	res.status(200).json({ message: 'Note successfully saved!'})
}