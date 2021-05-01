import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { User } from '../types/user';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    location.href = data.redirect;
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
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-500 hover:bg-indigo-400 outline-none font-medium"
          onClick={loginUser}
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{' '}
          <Link href="/signup">
            <span className="text-indigo-500 cursor-pointer">Sign up now!</span>
          </Link>
        </p>
      </main>
    </div>
  );
}
