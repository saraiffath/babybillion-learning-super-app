import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TalkingBabyScreen: React.FC = () => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [babyReply, setBabyReply] = useState('Tap me to start talking!');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript.trim();
        setTranscript(text);
        handleBabyEcho(text);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
        setBabyReply('I didn\'t hear that, try again!');
      };
      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = async () => {
    if (!recognitionRef.current) {
      // Fallback microphone recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          await playBackAsBaby(audioBlob);
        };

        mediaRecorder.start();
        setIsListening(true);
        setBabyReply('I am listening...');

        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            setIsListening(false);
            stream.getTracks().forEach(track => track.stop());
          }
        }, 3000);
        return;
      } catch (err) {
        console.error('Microphone access denied', err);
        setBabyReply('Please allow microphone access!');
        return;
      }
    }

    setIsListening(true);
    setBabyReply('I am listening...');
    recognitionRef.current.start();
  };

  const handleBabyEcho = (text: string) => {
    const lower = text.toLowerCase();
    
    // Baby talk transformations
    let babyWords = text
      .replace(/\byou\b/gi, 'you')
      .replace(/\bi\b/gi, 'me')
      .replace(/\bare\b/gi, 'am')
      .replace(/\bis\b/gi, 'is')
      .replace(/\bthe\b/gi, '')
      .replace(/\band\b/gi, 'an')
      .replace(/\bhave\b/gi, 'got')
      .replace(/\bgoing\b/gi, 'goin')
      .replace(/\bto\b/gi, 'ta')
      .replace(/\bfor\b/gi, 'fur')
      .replace(/\bcan\b/gi, 'can')
      .replace(/\bwill\b/gi, 'wanna')
      .replace(/\bdid\b/gi, 'du')
      .replace(/\bthat\b/gi, 'dat')
      .replace(/\bwhat\b/gi, 'wut')
      .replace(/\bthis\b/gi, 'dis')
      .replace(/\bon\b/gi, 'on')
      .replace(/\bat\b/gi, 'at')
      .replace(/\bno\b/gi, 'noo')
      .replace(/\byes\b/gi, 'yey')
      .replace(/\bhello\b/gi, 'helo')
      .replace(/\bgood\b/gi, 'gud')
      .replace(/\blove\b/gi, 'luv')
      .replace(/\byeah\b/gi, 'yeah')
      .replace(/\bokay\b/gi, 'okei');

    // Add baby suffixes
    const words = babyWords.split(' ');
    const transformed = words.map(word => {
      if (word.length > 3 && Math.random() > 0.5) {
        const last = word.slice(-1);
        if (['a','e','i','o','u'].includes(last)) {
          return word + 'y';
        } else {
          return word + 'ie';
        }
      }
      return word;
    }).join(' ');

    // Simple responses based on content
    let response = '';
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
      response = 'Heeey! Wanna play wit me?';
    } else if (lower.includes('how are you') || lower.includes('how r u')) {
      response = 'Me good! You good?';
    } else if (lower.includes('love') || lower.includes('luv')) {
      response = 'I luv you too! *giggle*';
    } else if (lower.includes('play') || lower.includes('game')) {
      response = 'Yay play time! Wanna play game?';
    } else if (lower.includes('sleep') || lower.includes('tired')) {
      response = 'Night night, sleepy time!';
    } else if (lower.includes('eat') || lower.includes('hungry')) {
      response = 'Yum yum! Me hungry too!';
    } else if (lower.includes('mom') || lower.includes('dad') || lower.includes('mother') || lower.includes('father')) {
      response = 'Mama! Daddy! Me wuv them!';
    } else if (lower.includes('fun') || lower.includes('funny')) {
      response = 'Hee hee! So funny!';
    } else if (lower.includes('sad') || lower.includes('cry')) {
      response = 'Oh no! Me hug you!';
    } else if (transformed) {
      response = `Me say: "${transformed}"`;
    } else {
      response = 'What you say? Me not understand...';
    }

    setIsProcessing(true);
    setBabyReply(`You said: "${text}"`);
    
    setTimeout(() => {
      setBabyReply(response);
      speakText(response);
      setIsProcessing(false);
    }, 800);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.3;
      utterance.pitch = 1.4;
      utterance.volume = 0.9;
      utterance.voice = speechSynthesis.getVoices().find(v => v.name.includes('Female')) || speechSynthesis.getVoices()[0];
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const playBackAsBaby = async (blob: Blob) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    try {
      const arrayBuffer = await blob.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.playbackRate.value = 1.5; 
      source.connect(audioContextRef.current.destination);
      
      setIsSpeaking(true);
      setBabyReply('Listen to me!');
      source.start();

      source.onended = () => {
        setIsSpeaking(false);
        setBabyReply('Talk to me again!');
      };
    } catch (err) {
      console.error('Playback error', err);
      setBabyReply('Oopsie! Try again!');
    }
  };

  const handleSpeak = (text: string) => {
    setBabyReply(text);
    speakText(text);
  };

  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      <button onClick={() => navigate(-1)} className="absolute top-4 left-4 text-3xl z-10">←</button>
      
      <div 
        onClick={!isListening && !isSpeaking && !isProcessing ? startListening : undefined}
        className={`text-center cursor-pointer transition-all duration-300 ${isSpeaking ? 'scale-125' : isListening ? 'scale-90 opacity-80' : 'scale-100 hover:scale-105'}`}
      >
        <div className={`text-9xl mb-8 relative ${isListening ? 'animate-pulse' : ''}`}>
          👶
          {isListening && (
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
          )}
        </div>
        <div className={`bg-white p-6 rounded-3xl shadow-xl text-2xl font-bold text-pink-500 mb-4 border-4 border-white ${isSpeaking ? 'animate-bounce' : ''}`}>
          {babyReply}
        </div>
        {transcript && (
          <div className="bg-blue-50 p-3 rounded-2xl text-lg text-blue-700 mb-4 max-w-md mx-auto">
            You said: "{transcript}"
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
        <button onClick={() => handleSpeak('Me wuv you!')} className="p-4 bg-white rounded-2xl shadow-md font-bold text-pink-400 hover:bg-pink-50 active:scale-95 transition-transform">❤️ Love</button>
        <button onClick={() => handleSpeak('Wanna play wit me?')} className="p-4 bg-white rounded-2xl shadow-md font-bold text-blue-400 hover:bg-blue-50 active:scale-95 transition-transform">🎮 Play</button>
        <button onClick={() => handleSpeak('Night night sleepy time!')} className="p-4 bg-white rounded-2xl shadow-md font-bold text-purple-400 hover:bg-purple-50 active:scale-95 transition-transform">🌙 Sleep</button>
        <button onClick={() => handleSpeak('Yum yum yummy!')} className="p-4 bg-white rounded-2xl shadow-md font-bold text-yellow-400 hover:bg-yellow-50 active:scale-95 transition-transform">🍎 Eat</button>
      </div>

      <div className="mt-8 text-gray-500 text-sm font-medium">
        {isListening ? 'Listening to you...' : isProcessing ? 'Thinking baby thoughts...' : 'Tap the baby to talk! She will reply in baby talk!'}
      </div>
    </div>
  );
};

export default TalkingBabyScreen;