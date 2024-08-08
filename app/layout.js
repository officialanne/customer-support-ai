'use client'

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import './globals.css';
import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

// Define light and dark themes with specified colors
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#a8d5ba', // Pale green
    },
    secondary: {
      main: '#2196f3', // Blue
    },
    background: {
      default: '#ffffff', // White background
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#a8d5ba', // Pale green
    },
    secondary: {
      main: '#2196f3', // Blue
    },
    background: {
      default: '#000000', // Black background
    },
  },
});

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState('light');

  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode');
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <header
            style={{
              padding: '16px',
              textAlign: 'center',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            Headstarter Support
          </header>
          <IconButton
            onClick={toggleTheme}
            style={{
              position: 'fixed',
              top: 16,
              right: 16,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
