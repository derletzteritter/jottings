import React, { useState } from 'react';
import Head from 'next/head';
import { User } from '../types/user';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (user: User) => {
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  };

  const loginUser = async (user: User) => {
    await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        <input
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button onClick={() => loginUser({ username, password })}>
          Register
        </button>
      </main>
    </div>
  );
}
