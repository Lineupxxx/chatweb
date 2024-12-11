import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: '¡Hola! ¿En qué puedo ayudarte?', isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: '¡Gracias por tu mensaje! Un representante te contactará pronto.',
        isBot: true
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 transition-colors duration-200"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
            <span className="font-medium">Chat de Ayuda</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] p-3 rounded-lg",
                  message.isBot
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-600 text-white ml-auto"
                )}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}