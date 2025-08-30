import { useState, useCallback, useRef } from 'react';

// Mock implementation of Web Speech API for environments where it's not available
const SpeechRecognitionMock = {
  start: () => {},
  stop: () => {},
  onresult: (event: any) => {},
  onerror: (event: any) => {},
  onend: () => {},
};

const getSpeechRecognition = () => {
  try {
    // FIX: Cast window to `any` to access non-standard SpeechRecognition properties, which are not in the default Window type.
    return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  } catch (e) {
    return undefined;
  }
};

export const useWebSpeech = (onResult: (transcript: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const startListening = useCallback(() => {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    
    if (recognitionRef.current) {
        recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      onResult(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
    recognitionRef.current = recognition;
  }, [onResult]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);
  
  const speak = useCallback((text: string, onEnd: () => void) => {
     if (!window.speechSynthesis) {
        alert('Speech synthesis is not supported in this browser.');
        onEnd();
        return;
     }
     const utterance = new SpeechSynthesisUtterance(text);
     utterance.onend = onEnd;
     utterance.onerror = (e) => {
        console.error("Speech synthesis error", e);
        onEnd();
     };
     window.speechSynthesis.cancel();
     window.speechSynthesis.speak(utterance);
  }, []);

  return { isListening, startListening, stopListening, speak };
};