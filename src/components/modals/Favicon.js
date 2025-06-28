'use client'

import { useTheme } from "@/context/ThemeContext";
import Head from "next/head";


export default function Favicon() {
    const {theme} = useTheme();
    return (
    <Head>
      <link 
        rel="icon" 
        href={theme === 'dark' ? '/icons-dark/favicon.ico' : '/icons-light/favicon.ico'}
        key="theme-favicon"
      />
    </Head>
    )
}