import React, { useState, useRef, useEffect } from 'react';
import { useInterview } from '../contexts/InterviewContext';
import MessageBubble from './MessageBubble';
import { Send, XCircle, ThumbsUp } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const { interviewState, sendMessage, endInterview, provideFeedback, resetInterview } = useInterview();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [interviewState.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!interviewState.isActive || !interviewState.currentRole) {
    return null;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Interview header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-gray-800 dark:text-white">
              {interviewState.currentRole.title} Interview
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Answer questions as you would in a real interview
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={provideFeedback}
              className="px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
            >
              <div className="flex items-center space-x-1">
                <ThumbsUp className="w-4 h-4" />
                <span>Feedback</span>
              </div>
            </button>
            <button
              onClick={resetInterview}
              className="px-3 py-1.5 text-sm bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-md hover:bg-red-100 dark:hover:bg-red-900/50"
            >
              <div className="flex items-center space-x-1">
                <XCircle className="w-4 h-4" />
                <span>End</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          {interviewState.messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your answer..."
                className="w-full p-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={1}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-500 hover:text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-300"
                disabled={!message.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-1">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;