'use client';

import { ThemeProvider, CssBaseline, Box, IconButton } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';
import './globals.css';
import { useState, useEffect } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpSection from './components/HelpSection'; // Import the HelpSection component

// Define light and dark themes with specified colors
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1c2872', // dark blue
    },
    secondary: {
      main: '#04eabc', // bright green
    },
    background: {
      default: '#e6f5f2', // light green background 
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#646daa', // pale blue
    },
    secondary: {
      main: '#04eabc', // bright green
    },
    background: {
      default: '#0c212d', // dark green background
    },
  },
});

export default function RootLayout({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  const [showHelp, setShowHelp] = useState(false);

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

  const toggleHelp = () => {
    setShowHelp((prev) => !prev);
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
              position: 'relative',
            }}
          >
            Headstarter Support
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              position="absolute"
              top={16}
              right={16}
              gap={1}
            >
              <IconButton onClick={toggleTheme} style={{ color: theme.palette.background.default }}>
                {themeMode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                onClick={toggleHelp} // Add onClick handler to toggle help section
                style={{ color: theme.palette.background.default }}
              >
                <HelpOutlineIcon />
              </IconButton>
            </Box>
          </header>
          <main style={{ padding: '16px', flexGrow: 1 }}>
            {children}
          </main>
          <HelpSection open={showHelp} onClose={() => setShowHelp(false)} />
        </ThemeProvider>
      </body>
    </html>
  );
}
