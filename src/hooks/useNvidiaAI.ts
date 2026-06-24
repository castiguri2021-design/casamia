import { useState, useCallback } from 'react';
import { systemPrompt } from '../data/chatContext';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export function useNvidiaAI() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', content: systemPrompt },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ];
    
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || 
        'Îmi pare rău, nu am putut procesa mesajul. Te rog încearcă din nou.';

      const finalMessages: ChatMessage[] = [
        ...newMessages,
        { role: 'assistant', content: assistantMessage },
      ];
      
      setMessages(finalMessages);
      return assistantMessage;

    } catch (error) {
      console.error('AI Error:', error);
      const errorMsg = 'Îmi pare rău, am o problemă tehnică momentan. Te rog sună la +40720718719 pentru asistență imediată.';
      setMessages([
        ...newMessages,
        { role: 'assistant', content: errorMsg },
      ]);
      return errorMsg;
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([{ role: 'system', content: systemPrompt }]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
}
