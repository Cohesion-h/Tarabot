import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlassCard, Icon, Button, InputField } from './Core';
import type { ChatMessage } from '../types';
import { useWebSpeech } from '../hooks/useWebSpeech';
import { geminiService } from '../services/geminiService';

interface VoiceChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceChatModal: React.FC<VoiceChatModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', parts: [{ text: "Hello! I am your Tarabot AI Agent. How can I assist you? I can help generate a business plan, create advertising materials, analyze market trends, or find potential investors for you." }] }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  const handleSpeechResult = useCallback((transcript: string) => {
    setCurrentInput(transcript);
  }, []);

  const { isListening, startListening, stopListening, speak } = useWebSpeech(handleSpeechResult);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!currentInput.trim() || isProcessing) return;

    stopListening();
    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: currentInput }] };
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <GlassCard className="w-full max-w-2xl h-[80vh] flex flex-col p-4 md:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-2xl text-white">AI Companion</h2>
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
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <InputField 
              label=""
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type or press mic to talk..."
              className="flex-grow"
              disabled={isProcessing}
            />
            <Button variant="icon" onClick={toggleListening} className={isListening ? 'text-[#ef4444]' : 'text-[#baccde]'} disabled={isProcessing}>
                <Icon name="mic" className={isListening ? 'animate-pulse' : ''} />
            </Button>
            <Button variant="icon" onClick={handleSpeakLastResponse} className={isSpeaking ? 'text-[#2762d4]' : ''} disabled={isProcessing}>
              <Icon name="volume-2" />
            </Button>
            <Button variant="primary" onClick={handleSend} disabled={isProcessing || !currentInput.trim()}>
              <Icon name="send" />
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
