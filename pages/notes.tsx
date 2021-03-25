import React, { useEffect, useState } from 'react';
import { NextPageContext } from 'next';
import { useUser } from '../lib/hooks';

export default function Notes({ data }: any) {
  const user = useUser({ redirectTo: '/login' });

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState<any[]>([
    {
      id: 1,
      title: 'My first note',
      content: 'This is a great app',
    },
    {
      id: 2,
      title: 'My second note',
      content: 'This is a app that still does not work',
    },
  ]);

  useEffect(() => {
    setNotes(data);
  }, [data]);

  const handleOpenNote = (note: any) => {
    setTitle(note.title);
    setText(note.content);
  };

  const handleSaveNote = async (id: any) => {
    const res = await fetch('/api/saveNote', {
      method: 'POST',
      body: JSON.stringify({ id, title, text }),
    });
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-screen">
      <aside className="border-gray-400 border-r">
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-3xl p-3">Your notes</h1>
          <button className="p-3 py-2 mr-2 font-semibold rounded-full bg-purple-700 text-white">
            New note
          </button>
        </div>

        <div>
          {notes.map((note) => (
            <div
              key={note.id}
              className="p-3 border-gray-300 border-b hover:bg-gray-100 flex items-center justify-between"
            >
              <div>
                <h1
                  className="font-medium hover:underline cursor-pointer"
                  onClick={() => handleOpenNote(note)}
                >
                  {note.title}
                </h1>
                <p className="text-gray-400">{note.content.slice(0, 15)}</p>
              </div>
              <div>
                <button
                  className="bg-purple-700 rounded-full text-white p-2 py-1 font-medium"
                  onClick={() => handleSaveNote(note.id)}
                >
                  Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="col-span-2">
        <input
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          className="p-3 w-full outline-none border-b"
        />
        <textarea
          placeholder="Start writing!"
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          className="p-3 w-full h-full outline-none"
        />
      </main>
    </div>
  );
}

export async function getStaticProps(ctx: NextPageContext) {
  const res = await fetch('http://localhost:3000/api/notes', {
    method: 'GET',
  });
  const data = await res.json();

  return {
    props: { data },
  };
}
