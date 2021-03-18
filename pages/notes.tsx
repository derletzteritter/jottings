import React, { useState } from 'react';
import { NextPageContext } from "next";

export default function Notes({ data }: any) {
	const [notes, setNotes] = useState([
		{
			id: 1,
			title: 'My first note',
			content: 'Taso is bad dev'
		},
		{
			id: 1,
			title: 'My second note',
			content: "Goat is really rude"
		}
	])

	console.log(data);

	const [text, setText] = useState('');

	return (
		<div className="grid grid-cols-3 gap-4 h-screen">
			<aside className="border-gray-400 border-r">
				<div className="flex items-center justify-between">
					<h1 className="font-bold text-3xl p-3">Your notes</h1>
					<button className="p-3 py-2 mr-2 font-semibold rounded-full bg-purple-700 text-white">New note</button>
				</div>

				{/*
					Here goes the list of notes you have.
					This is currently mock up data, but will get it from db later on.
				 */}

				 <div>
					 {data.map((note: any) => (
					 	<div key={note.id} className="p-3 border-gray-300 border-b hover:bg-gray-100 cursor-pointer">
							  <h1 className="font-medium">{note.title}</h1>
							  <p className="text-gray-400">{note.content}</p>
					  </div>
					 ))}
				 </div>
			</aside>
			<main className="col-span-2">
				<textarea placeholder="Start writing!" value={text} onChange={e => setText(e.currentTarget.value)} className="p-3 w-full h-full outline-none"/>
			</main>
		</div>
	)
}

export async function getStaticProps(ctx: NextPageContext) {
	const res = await fetch('http://localhost:3000/api/notes', {
		method: 'POST'
	});
	const data = await res.json();

	return {
		props: { data }
	}
}