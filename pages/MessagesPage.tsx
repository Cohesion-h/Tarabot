import React, { useState, useEffect, useRef } from 'react';
import { GlassCard, Icon, Button } from '../components/Core';
import type { Conversation, ChatMessageItem } from '../types';
import { useAuth } from '../context/AuthContext';

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: 1, name: 'Dana Al-Fahad', avatar: 'https://i.pravatar.cc/40?u=dana', lastMessage: 'Great, I will send over the Figma file.', unread: true,
        messages: [
            { id: 1, sender: 'other', text: 'Hey! I saw your post about needing a UI/UX designer. I\'d love to chat about your project.', timestamp: '10:30 AM' },
            { id: 2, sender: 'me', text: 'Hi Dana, thanks for reaching out. Your portfolio looks fantastic. Are you experienced with fintech apps?', timestamp: '10:31 AM' },
            { id: 3, sender: 'other', text: 'Absolutely! My last project was a mobile banking app. I can show you some mockups.', timestamp: '10:32 AM' },
            { id: 4, sender: 'me', text: 'That would be perfect.', timestamp: '10:33 AM' },
            { id: 5, sender: 'other', text: 'Great, I will send over the Figma file.', timestamp: '10:34 AM' }
        ]
    },
    {
        id: 2, name: 'Khaled Al-Mutairi', avatar: 'https://i.pravatar.cc/40?u=khaled', lastMessage: 'Sounds good, let\'s connect next week.', unread: false,
        messages: [{ id: 1, sender: 'other', text: 'Sounds good, let\'s connect next week.', timestamp: 'Yesterday' }]
    }
];

export const MessagesPage: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedConversation?.messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedConversation) return;

        const message: ChatMessageItem = {
            id: Date.now(),
            sender: 'me',
            text: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        const updatedConversation = {
            ...selectedConversation,
            messages: [...selectedConversation.messages, message],
            lastMessage: newMessage,
        };

        setSelectedConversation(updatedConversation);
        setConversations(convs => convs.map(c => c.id === updatedConversation.id ? updatedConversation : c));
        setNewMessage('');
    };

    return (
        <div className="h-[calc(100vh-100px)] md:h-[calc(100vh-130px)] flex gap-4 md:gap-8">
            {/* Conversation List */}
            <GlassCard className="w-1/3 min-w-[200px] h-full flex-col hidden md:flex">
                <div className="p-4 border-b border-white/10">
                    <h2 className="font-display text-2xl text-white">Chats</h2>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {conversations.map(conv => (
                        <div key={conv.id} onClick={() => setSelectedConversation(conv)}
                             className={`flex items-center gap-3 p-3 cursor-pointer border-l-4 transition-colors ${selectedConversation?.id === conv.id ? 'border-[#2762d4] bg-white/5' : 'border-transparent hover:bg-white/5'}`}>
                            <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full"/>
                            <div className="flex-grow overflow-hidden">
                                <p className="font-semibold text-white truncate">{conv.name}</p>
                                <p className="text-sm text-white/70 truncate">{conv.lastMessage}</p>
                            </div>
                            {conv.unread && <div className="w-3 h-3 bg-[#2762d4] rounded-full flex-shrink-0"></div>}
                        </div>
                    ))}
                </div>
            </GlassCard>

            {/* Chat Window */}
            <GlassCard className="w-full md:w-2/3 h-full flex flex-col">
                {selectedConversation ? (
                    <>
                        <div className="p-4 border-b border-white/10 flex items-center gap-3">
                            <img src={selectedConversation.avatar} alt={selectedConversation.name} className="w-10 h-10 rounded-full"/>
                            <h2 className="font-display text-2xl text-white">{selectedConversation.name}</h2>
                        </div>
                        <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                           {selectedConversation.messages.map(msg => (
                               <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                   {msg.sender === 'other' && <img src={selectedConversation.avatar} className="w-6 h-6 rounded-full"/>}
                                   <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'me' ? 'bg-[#2762d4] text-white' : 'bg-[#191919]'}`}>
                                       <p>{msg.text}</p>
                                   </div>
                                    {msg.sender === 'me' && <img src={`https://i.pravatar.cc/40?u=${user?.email}`} className="w-6 h-6 rounded-full"/>}
                               </div>
                           ))}
                           <div ref={chatEndRef} />
                        </div>
                        <div className="p-4 border-t border-white/10">
                             <div className="flex items-center gap-2">
                                <input
                                  value={newMessage}
                                  onChange={(e) => setNewMessage(e.target.value)}
                                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                  placeholder="Type a message..."
                                  className="w-full bg-[#191919] p-2 rounded-lg text-[#baccde] border border-[#baccde]/50 focus:outline-none focus:border-[#2762d4]"
                                />
                                <Button variant="primary" onClick={handleSendMessage} disabled={!newMessage.trim()}>
                                  <Icon name="send" />
                                </Button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p>Select a conversation to start chatting.</p>
                    </div>
                )}
            </GlassCard>
        </div>
    );
};
