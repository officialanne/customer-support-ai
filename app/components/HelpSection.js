// app/components/HelpSection.js
import { Box, Typography, IconButton, Collapse } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const HelpSection = ({ open, onClose }) => {
  const theme = useTheme();
  const borderColor = theme.palette.mode === 'dark' ? 'white' : 'black';

  return (
    <Collapse in={open}>
      <Box
        position="fixed"
        top={0}
        left={0}
        width="300px"
        height="100%"
        bgcolor="background.default"
        borderRight={`1px solid ${borderColor}`}
        p={2}
        display="flex"
        flexDirection="column"
        zIndex={1000} // Ensure it is above other elements
      >
        <IconButton onClick={onClose} style={{ alignSelf: 'flex-end' }}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" color="text.primary" mb={2}>
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
  );
};

export default HelpSection;
