export type Role = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type MessageType = 'ai' | 'user' | 'system' | 'feedback';

export type Message = {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
};

export type InterviewState = {
  isActive: boolean;
  currentRole: Role | null;
  messages: Message[];
  feedback: string | null;
};