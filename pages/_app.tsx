import React from 'react';
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
