'use client'

import { Box, Button, Stack, TextField, Typography, CircularProgress, Collapse } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import { AccountCircle, SupportAgent } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion'; // Import motion

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

    const data = await response.json();
    setMessages((prevMessages) => [...prevMessages, data]);
    setIsLoading(false);
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

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bgcolor={theme.palette.background.default}
      position="relative"
      overflow="hidden"
    >
      <Collapse in={showHelp}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box mb={2} p={2} bgcolor={theme.palette.background.paper} border={`1px solid ${borderColor}`} borderRadius={4}>
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
        </motion.div>
      </Collapse>

      <Stack
        direction="column"
        width={{ xs: '90%', sm: '600px' }}
        height={{ xs: '90vh', sm: '700px' }}
        border={`1px solid ${borderColor}`}
        p={2}
        spacing={3}
        bgcolor={theme.palette.background.paper}
        color={theme.palette.text.primary}
        borderRadius={4}
        boxShadow={3}
        position="relative"
        sx={{
          // Define the moving gradient background
          background: `linear-gradient(270deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          '@keyframes gradientShift': {
            '0%': {
              backgroundPosition: '0% 0%',
            },
            '50%': {
              backgroundPosition: '100% 100%',
            },
            '100%': {
              backgroundPosition: '0% 0%',
            },
          },
        }}
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
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ display: 'flex', alignItems: 'center', justifyContent: msg.role === 'assistant' ? 'flex-start' : 'flex-end', marginBottom: '8px' }}
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
                boxShadow={1}
              >
                {msg.role === 'assistant' ? <SupportAgent /> : <AccountCircle />}
                <Box ml={1}>{msg.content}</Box>
              </Box>
            </motion.div>
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
            variant="outlined"
            InputProps={{
              style: { borderRadius: '16px' },
            }}
          />
          <Button
            variant="contained"
            onClick={sendMessage}
            disabled={isLoading}
            style={{ borderRadius: '16px' }}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Send'}
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
            variant="outlined"
            InputProps={{
              style: { borderRadius: '16px' },
            }}
          />
          <Button
            variant="contained"
            onClick={sendFeedback}
            disabled={!feedback.trim()}
            style={{ borderRadius: '16px' }}
          >
            Submit Feedback
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
