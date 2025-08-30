export type Role = 'Creator' | 'Investor';

export interface User {
  name: string;
  email: string;
  role: Role | null;
  profileData: Record<string, any>;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  isOnboarded: boolean;
  login: () => void;
  logout: () => void;
  setUserRole: (role: Role) => void;
  setVerified: () => void;
  updateUser: (data: Record<string, any>) => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

// Type for the dynamic networking feed
export interface Post {
    id: number;
    author: string;
    avatar: string;
    timestamp: string;
    content: string;
    image?: string;
}

// Types for the new Messaging feature
export interface ChatMessageItem {
    id: number;
    sender: 'me' | 'other';
    text: string;
    timestamp: string;
}

export interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    unread: boolean;
    messages: ChatMessageItem[];
}

// Type for the new Notification feature
export interface Notification {
    id: number;
    icon: keyof typeof import('../constants').ICONS;
    text: string;
    time: string;
}
