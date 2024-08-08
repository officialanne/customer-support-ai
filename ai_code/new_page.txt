'use client';

import { Box, Button, Stack, TextField, Typography, Collapse } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { AccountCircle, SupportAgent } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Headstarter support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const theme = useTheme();
  const borderColor = theme.palette.mode === 'dark' ? 'white' : 'black';

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

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let result = '';

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
            setMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              const otherMessages = prevMessages.slice(0, -1);
              return [...otherMessages, { ...lastMessage, content: result }];
            });
          }
        } catch (error) {
          console.error('Error reading stream:', error);
        } finally {
          setIsLoading(false);
        }
      },
    });

    await stream;
  };

  const sendFeedback = async () => {
    if (!feedback.trim()) return;

    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: feedback.trim() }),
    });

    setFeedback('');
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
      <Collapse in={showHelp}>
        <Box mb={2} p={2} bgcolor="background.default" border={`1px solid ${borderColor}`}>
          <Typography variant="h6" color="text.primary" mb={1}>
            Help Section
          </Typography>
          <Typography variant="body2" color="textSecondary">
            You can ask me about:
          </Typography>
          <ul>
            <li>Login issues</li>
            <li>Password resets</li>
            <li>Account management</li>
            <li>Technical support</li>
            <li>Interview preparation</li>
            <li>Subscription and billing</li>
            <li>General inquiries</li>
            <li>Who I am and the purpose of Headstarter</li>
          </ul>
        </Box>
      </Collapse>
      
      <Stack
        direction="column"
        width="600px"
        height="700px"
        border={`1px solid ${borderColor}`}
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
          HeadstarterAI Support Chatbot
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
        <Stack direction="row" spacing={2} mt={2}>
          <TextField
            label="Feedback"
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendFeedback();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={sendFeedback}
            disabled={!feedback.trim()}
          >
            Submit Feedback
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
