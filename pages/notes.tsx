import React, { useState } from 'react';

export default function Notes() {
	const [notes, setNotes] = useState([
		{
			id: 1,
			content: 'My very first note'
		}
	])

	return (
		<section>
			<h1>Your notes</h1>
			<div>
				{notes.map((note) => (
					<div key={note.id}>
						<p>{note.content}</p>
					</div>
				))}
			</div>
		</section>
	)
}