import { NextResponse } from 'next/server';

const responses = {
  login: "If you're having trouble logging in, please try resetting your password using the 'Forgot Password' link on the login page. If you still can't access your account, please let us know, and we will assist you further.",
  password_reset: "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to receive a password reset email.",
  account_management: "To update your profile, go to your account settings. From there, you can change your personal information, update your email address, and more.",
  technical_support: "For audio or video issues, ensure your device settings allow access to your microphone and camera. Try restarting your browser or device. If the problem persists, please provide more details so we can assist you further.",
  interview_preparation: "We offer a variety of practice questions and detailed feedback to help you prepare. After each session, review the feedback to identify areas for improvement. Our resources section also has tips and strategies for effective interview preparation.",
  subscription: "To manage your subscription, go to the 'Billing' section in your account settings. You can upgrade, downgrade, or cancel your subscription there. If you encounter any issues, let us know, and we can help.",
  billing: "For billing-related questions, go to the 'Billing' section of your account settings. You can view your payment history, update your payment method, and manage your subscription plan.",
  general: "I'm here to assist you with any questions or issues you have about Headstarter. Please provide more details about your query, and I'll do my best to help.",
  who_are_you: "I am an AI customer support assistant for Headstarter. My role is to help users with any questions or issues they encounter while using the Headstarter platform.",
  purpose: "My purpose is to assist you with account management, technical support, interview preparation, and any questions regarding subscriptions and billing on the Headstarter platform.",
  who_is_headstarter: "Headstarter is an interview practice platform where users can practice technical interviews in real-time with an AI interviewer. Our goal is to help you prepare effectively for technical interviews and improve your skills.",
  closing: "I'm always happy to help! Please let me know if you need any more assistance.",
  default: "I'm here to help! Please provide more details about your issue so I can assist you better.",
};

const getResponse = (message) => {
  message = message.toLowerCase();
  if (message.includes('login')) {
    return responses.login;
  } else if (message.includes('password')) {
    return responses.password_reset;
  } else if (message.includes('account')) {
    return responses.account_management;
  } else if (message.includes('technical')) {
    return responses.technical_support;
  } else if (message.includes('interview')) {
    return responses.interview_preparation;
  } else if (message.includes('subscription')) {
    return responses.subscription;
  } else if (message.includes('billing')) {
    return responses.billing;
  } else if (message.includes('who are you')) {
    return responses.who_are_you;
  } else if (message.includes('purpose')) {
    return responses.purpose;
  } else if (message.includes('who is headstarter')) {
    return responses.who_is_headstarter;
  } else if (message.includes('thank')){
    return responses.closing;
  } else if (message.includes('general')) {
    return responses.general;
  } else {
    return responses.default;
  }
};

export async function POST(req) {
  const data = await req.json();
  const userMessage = data[data.length - 1].content;
  const responseContent = getResponse(userMessage);

  const response = {
    role: 'assistant',
    content: responseContent,
  };

  return NextResponse.json(response);
}
