'use client'

import { useTheme } from "@/context/ThemeContext";
import Head from "next/head";


export default function Favicon() {
    const {theme} = useTheme();
    return (
        <Head>
            <link
            rel="icon"
            href={theme === 'dark' ? '/dark-favicon.ico' : '/light-favicon.ico'}
            key="theme-favicon"
            />
        </Head>
    )
}