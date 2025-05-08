import React from 'react';
import { Message } from '../types';
import { UserIcon, BotIcon, InfoIcon } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { type, content } = message;
  
  if (type === 'system') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg max-w-2xl">
          <div className="flex items-start space-x-2">
            <InfoIcon className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
            <p className="text-gray-700 dark:text-gray-300">{content}</p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'feedback') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 px-4 py-3 rounded-lg max-w-2xl">
          <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">Interview Feedback</h4>
          <p className="text-gray-700 dark:text-gray-300">{content}</p>
        </div>
      </div>
    );
  }

  const isUser = type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-start space-x-2 max-w-2xl ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 
                  'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
        }`}>
          {isUser ? <UserIcon className="w-5 h-5" /> : <BotIcon className="w-5 h-5" />}
        </div>
        
        <div className={`px-4 py-3 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
        }`}>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;