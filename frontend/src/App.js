import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', message: input };
    setChat([...chat, userMessage]);

    try {
      // 백엔드 Spring에 POST 요청 (나중에 실제 API 연동 예정)
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage = { sender: 'bot', message: data.reply };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [...prev, { sender: 'bot', message: '오류가 발생했습니다.' }]);
    }

    setInput('');
  };

  return (
    <div className="App">
      <h2>ChatGPT 스타일 챗봇</h2>
      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i} className={`chat-message ${c.sender}`}>
            <strong>{c.sender === 'user' ? '🧑 나' : '🤖 GPT'}:</strong> {c.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}

export default App;
