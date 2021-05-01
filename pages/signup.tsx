import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { User } from '../types/user';
import { createUser } from '../lib/user';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    console.log('creating user');
    const res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('created user');
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-200 p-40 rounded shadow-md flex flex-col">
        <h1 className="text-black font-bold text-3xl text-center">
          Jottings <span className="text-indigo-500 font-bold">.</span>
        </h1>
        <input
          value={username}
          placeholder="Username"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          value={password}
          placeholder="Password"
          className="p-2 rounded mt-4 font-regular outline-none text-gray-500"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <div className="flex items-items mt-3">
          <input
            value={password}
            type="checkbox"
            className="m-1"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <label>Do you like cats?</label>
        </div>
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-500 hover:bg-indigo-400 outline-none font-medium"
          onClick={registerUser}
        >
          Register
        </button>
        <p className="mt-4">
          Already have an account?{' '}
          <Link href="/login">
            <span className="text-indigo-500 cursor-pointer">Log in now!</span>
          </Link>
        </p>
      </main>
    </div>
  );
}
