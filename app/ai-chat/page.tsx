'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '.')
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API 請求失敗');
      }

      if (!data.message) {
        throw new Error('未收到 AI 回應');
      }
      
      const aiMessage: Message = {
        id: Date.now() + 1,
        content: data.message,
        isUser: false,
        timestamp: new Date().toLocaleString('zh-TW', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        }).replace(/\//g, '.')
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : '發生未知錯誤');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="輸入訊息..."
          className={styles.input}
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          className={styles.sendButton}
          disabled={isLoading}
        >
          {isLoading ? '處理中...' : '送出'}
        </button>
      </div>
      <div className={styles.chatContainer}>
        {isLoading && (
          <div className={`${styles.messageWrapper} ${styles.aiMessage}`}>
            <div className={styles.avatar}>
              <Image 
                src="/images/ai.jpg" 
                alt="AI" 
                width={40}
                height={40}
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.messageGroup}>
              <div className={styles.messageContent}>
                <FontAwesomeIcon icon={faSpinner} spin style={{ marginRight: '10px' }} />
                AI正在思考中，請稍候...
              </div>
            </div>
          </div>
        )}
        {[...messages].reverse().map((message) => (
          <div
            key={message.id}
            className={`${styles.messageWrapper} ${
              message.isUser ? styles.userMessage : styles.aiMessage
            }`}
          >
            {!message.isUser && (
              <div className={styles.avatar}>
                <Image 
                  src="/images/ai.jpg" 
                  alt="AI" 
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
              </div>
            )}
            <div className={styles.messageGroup}>
              <div className={styles.messageContent}>
                {message.content}
              </div>
              <div className={styles.timestamp}>
                {message.timestamp}
              </div>
            </div>
            {message.isUser && (
              <div className={styles.avatar}>
                <Image 
                  src="/images/user.jpg" 
                  alt="User" 
                  width={40}
                  height={40}
                  className={styles.avatarImage}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
