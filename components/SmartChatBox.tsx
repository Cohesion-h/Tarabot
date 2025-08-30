import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlassCard, Icon, Button } from './Core';
import type { ChatMessage } from '../types';
import { useWebSpeech } from '../hooks/useWebSpeech';
import { geminiService } from '../services/geminiService';

interface SmartChatBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const AI_TOOLS = [
    { command: '/createSlideDeck', name: 'Create Slide Deck', description: 'Generate a presentation from a prompt.' },
    { command: '/deepResearch', name: 'Deep Research', description: 'Conduct in-depth research on a topic.' },
    { command: '/factCheck', name: 'Fact Check', description: 'Verify information from sources.' },
    { command: '/aiDeveloper', name: 'AI Developer', description: 'Generate or debug code.' },
];

export const SmartChatBox: React.FC<SmartChatBoxProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hello! I am your Tarabot AI Super Agent. How can I help? Type `/` to see available tools." }] }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showCommands, setShowCommands] = useState(false);
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleSpeechResult = useCallback((transcript: string) => {
    setCurrentInput(transcript);
  }, []);

  const { isListening, startListening, stopListening, speak } = useWebSpeech(handleSpeechResult);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    setShowCommands(currentInput.startsWith('/'));
  }, [currentInput]);

  const handleSend = async (text?: string) => {
    const messageToSend = text || currentInput;
    if (!messageToSend.trim() || isProcessing) return;

    stopListening();
    setShowCommands(false);
    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: messageToSend }] };
    setHistory(prev => [...prev, newUserMessage]);
    setCurrentInput('');
    setIsProcessing(true);

    const stream = geminiService.streamChat([...history, newUserMessage]);
    const reader = stream.getReader();
    let responseText = '';

    setHistory(prev => [...prev, { role: 'model', parts: [{ text: '' }] }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = value;
      responseText += chunk;
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].parts[0].text = responseText;
        return newHistory;
      });
    }

    setIsProcessing(false);
    inputRef.current?.focus();
  };
  
  const toggleListening = () => {
      if (isListening) {
          stopListening();
          setTimeout(() => handleSend(), 100);
      } else {
          startListening();
      }
  };
  
  const handleSpeakLastResponse = () => {
    const lastModelResponse = history.slice().reverse().find(m => m.role === 'model');
    if (lastModelResponse && lastModelResponse.parts[0].text && !isSpeaking) {
        setIsSpeaking(true);
        speak(lastModelResponse.parts[0].text, () => setIsSpeaking(false));
    }
  };
  
  const handleCommandClick = (command: string) => {
      setCurrentInput(command + ' ');
      setShowCommands(false);
      inputRef.current?.focus();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <GlassCard className="w-full max-w-2xl h-[80vh] flex flex-col p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl text-white">AI Super Agent</h2>
          <Button variant="icon" onClick={onClose}><Icon name="x-circle" /></Button>
        </div>
        
        <div ref={transcriptRef} className="flex-grow overflow-y-auto pr-2 space-y-4">
          {history.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-[#2762d4] text-white' : 'bg-[#191919]'}`}>
                {msg.parts[0].text}
              </div>
            </div>
          ))}
           {isProcessing && history[history.length - 1]?.role === 'model' && <Icon name="loader" />}
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10 relative">
          {showCommands && (
            <GlassCard className="absolute bottom-full left-0 w-full mb-2 p-2 max-h-48 overflow-y-auto">
                {AI_TOOLS.filter(t => t.command.toLowerCase().includes(currentInput.toLowerCase())).map(tool => (
                    <div key={tool.command} onClick={() => handleCommandClick(tool.command)} className="p-2 rounded-md hover:bg-white/10 cursor-pointer">
                        <p className="font-semibold text-white">{tool.name}</p>
                        <p className="text-sm text-white/70">{tool.description}</p>
                    </div>
                ))}
            </GlassCard>
          )}

          <div className="flex items-center gap-2">
            <Button variant="icon"><Icon name="paperclip"/></Button>
            <input
              ref={inputRef}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message or / for commands..."
              className="w-full bg-[#191919] p-2 rounded-lg text-[#baccde] border border-[#baccde]/50 focus:outline-none focus:border-[#2762d4]"
              disabled={isProcessing}
            />
            <Button variant="icon" onClick={toggleListening} className={isListening ? 'text-[#ef4444]' : 'text-[#baccde]'} disabled={isProcessing}>
                <Icon name="mic" className={isListening ? 'animate-pulse' : ''} />
            </Button>
            <Button variant="primary" onClick={() => handleSend()} disabled={isProcessing || !currentInput.trim()}>
              <Icon name="send" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
