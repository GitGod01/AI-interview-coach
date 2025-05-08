import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { InterviewProvider } from './contexts/InterviewContext';
import Header from './components/Header';
import Footer from './components/Footer';
import RoleSelection from './components/RoleSelection';
import ChatInterface from './components/ChatInterface';
import { useInterview } from './contexts/InterviewContext';

// Main application component that uses the interview context
const InterviewApp: React.FC = () => {
  const { interviewState } = useInterview();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-1">
        {!interviewState.isActive ? (
          <RoleSelection />
        ) : (
          <ChatInterface />
        )}
      </main>
      <Footer />
    </div>
  );
};

// Wrapper component that provides context
function App() {
  return (
    <ThemeProvider>
      <InterviewProvider>
        <InterviewApp />
      </InterviewProvider>
    </ThemeProvider>
  );
}

export default App;