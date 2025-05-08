import React, { createContext, useContext, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { InterviewState, Message, Role, MessageType } from '../types';
import { ROLES } from '../utils/constants';

interface InterviewContextType {
  interviewState: InterviewState;
  startInterview: (role: Role) => void;
  endInterview: () => void;
  sendMessage: (content: string) => Promise<void>;
  provideFeedback: () => Promise<void>;
  resetInterview: () => void;
}

const InterviewContext = createContext<InterviewContextType | undefined>(undefined);

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });


export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interviewState, setInterviewState] = useState<InterviewState>({
    isActive: false,
    currentRole: null,
    messages: [],
    feedback: null,
  });

  const createMessage = (content: string, type: MessageType): Message => ({
    id: Date.now().toString(),
    content,
    type,
    timestamp: new Date(),
  });

  const generatePrompt = (role: Role, context: string = '') => {
    return `You are an experienced interviewer conducting a mock interview for a ${role.title} position. ${context}
    Keep your responses focused, professional, and constructive. Ask one question at a time.
    If the candidate asks a question, provide a helpful response and then continue with the interview.`;
  };

  const startInterview = useCallback(async (role: Role) => {
    const initialMessage = createMessage(
      `Welcome to your mock interview for the ${role.title} position. I'll be your AI interviewer today. Let's begin with the first question.`,
      'system'
    );

    setInterviewState({
      isActive: true,
      currentRole: role,
      messages: [initialMessage],
      feedback: null,
    });

    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [generatePrompt(role)],
          },
          {
            role: "model",
            parts: ["I understand. I'll conduct a professional mock interview for this role."],
          },
        ],
      });

      const result = await chat.sendMessage("Please ask me the first interview question.");
      const response = await result.response;
      const firstQuestion = createMessage(response.text(), 'ai');

      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, firstQuestion],
      }));
    } catch (error) {
      console.error('Error starting interview:', error);
      const errorMessage = createMessage(
        "I apologize, but I'm having trouble connecting to the AI service. Please try again later.",
        'system'
      );
      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!interviewState.isActive || !interviewState.currentRole) return;

    const userMessage = createMessage(content, 'user');
    setInterviewState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));

    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [generatePrompt(interviewState.currentRole)],
          },
          ...interviewState.messages.map(msg => ({
            role: msg.type === 'ai' ? "model" : "user",
            parts: [msg.content],
          })),
        ],
      });

      const result = await chat.sendMessage(content);
      const response = await result.response;
      const aiMessage = createMessage(response.text(), 'ai');

      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
      }));
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = createMessage(
        "I apologize, but I'm having trouble connecting to the AI service. Please try again later.",
        'system'
      );
      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  }, [interviewState.isActive, interviewState.currentRole, interviewState.messages]);

  const provideFeedback = useCallback(async () => {
    if (!interviewState.isActive || !interviewState.currentRole) return;

    try {
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [`You are an experienced interviewer. Please analyze the following interview conversation and provide constructive feedback on the candidate's performance. Focus on strengths and areas for improvement.

            Role: ${interviewState.currentRole.title}
            
            Interview conversation:
            ${interviewState.messages.map(msg => `${msg.type}: ${msg.content}`).join('\n')}`],
          },
        ],
      });

      const result = await chat.sendMessage("Please provide feedback on this interview.");
      const response = await result.response;
      const feedbackMessage = createMessage(response.text(), 'feedback');

      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, feedbackMessage],
        feedback: response.text(),
      }));
    } catch (error) {
      console.error('Error generating feedback:', error);
      const errorMessage = createMessage(
        "I apologize, but I'm having trouble generating feedback at the moment. Please try again later.",
        'system'
      );
      setInterviewState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage],
      }));
    }
  }, [interviewState.isActive, interviewState.currentRole, interviewState.messages]);

  const endInterview = useCallback(() => {
    setInterviewState(prev => ({
      ...prev,
      isActive: false,
    }));
  }, []);

  const resetInterview = useCallback(() => {
    setInterviewState({
      isActive: false,
      currentRole: null,
      messages: [],
      feedback: null,
    });
  }, []);

  return (
    <InterviewContext.Provider 
      value={{ 
        interviewState, 
        startInterview, 
        endInterview, 
        sendMessage, 
        provideFeedback,
        resetInterview
      }}
    >
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = (): InterviewContextType => {
  const context = useContext(InterviewContext);
  if (context === undefined) {
    throw new Error('useInterview must be used within an InterviewProvider');
  }
  return context;
};