'use client';
import { useTheme } from '@/context/ThemeContext';
import { FaMoon } from 'react-icons/fa';
import { IoSunnyOutline } from "react-icons/io5";
import styles from './ThemeToggle.module.css'

export default function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();
 
 return (
   <button
     onClick={toggleTheme}
     className={styles.themeToggle}
     aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
   >
     {theme === 'light' ? <FaMoon /> : <IoSunnyOutline />}
   </button>
 );
}