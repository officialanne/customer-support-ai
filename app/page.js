'use client';

import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { AccountCircle, SupportAgent } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'; // Import useTheme

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Headstarter support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme(); // Use the theme object
  const borderColor = theme.palette.mode === 'dark' ? 'white' : 'black'; // Conditional border color

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message.trim() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setMessage('');
    setIsLoading(true);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, userMessage]),
    });

    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, data]);
    setIsLoading(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border={`1px solid ${borderColor}`} // Apply border color based on theme
        p={2}
        spacing={3}
        bgcolor="background.default"
        color="text.primary"
      >
        <Typography
          variant="h6"
          align="center"
          color="primary"
          fontWeight="bold"
          padding={2}
        >
          Headstarter Support
        </Typography>
        <Stack
          direction="column"
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((msg, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
            >
              <Box
                display="flex"
                alignItems="center"
                bgcolor={msg.role === 'assistant' ? 'primary.main' : 'secondary.main'}
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="80%"
                textAlign={msg.role === 'assistant' ? 'left' : 'right'}
              >
                {msg.role === 'assistant' ? <SupportAgent /> : <AccountCircle />}
                <Box ml={1}>{msg.content}</Box>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction="row" spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
