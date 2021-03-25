import React, { useState } from 'react';
import Head from 'next/head';
import Router from 'next/router';

export default function Home() {
  const handleRoute = () => {
    Router.push('/login');
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
        <button
          className="text-white p-2 rounded mt-4 bg-indigo-500 hover:bg-indigo-400 outline-none font-medium"
          onClick={handleRoute}
        >
          Login
        </button>
      </main>
    </div>
  );
}
