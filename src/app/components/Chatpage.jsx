"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const chatBoxRef = useRef(null);

    // Load messages from local storage on component mount
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(savedMessages);
    }, []);

    // Save messages to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    // Scroll to bottom of chat when messages change
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const addMessage = (role, content) => {
        setMessages(prevMessages => [...prevMessages, { role, content }]);
    };

    const sendMessage = async (messageToSend = inputMessage) => {
        if (messageToSend.trim()) {
            addMessage("user", messageToSend);
            setInputMessage("");

            try {
                const response = await axios.post('http://localhost:8080/v1/chat/completions', {
                    model: "/root/LLaMA-Factory/models/llama3_lora_sft",
                    messages: [...messages, { role: "user", content: messageToSend }]
                }, {
                    headers: {
                        'Authorization': 'Bearer token-abc123',
                        'Content-Type': 'application/json'
                    }
                });

                const aiMessage = response.data.choices[0].message.content;
                addMessage("assistant", aiMessage);

            } catch (error) {
                console.error('Error:', error);
                addMessage("system", "เกิดข้อผิดพลาดขณะส่งข้อความ");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="flex min-h-screen bg-gradient-to-r from-green-200 to-green-400 font-sans">
            {/* Sidebar */}
            <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white p-4 transition-all duration-300`}>
                <button onClick={toggleSidebar} className="mb-4 p-2 bg-green-500 text-white rounded">
                    ☰
                </button>
                {isSidebarOpen && (
                    <button onClick={clearChat} className="w-full mb-4 p-2 bg-green-500 text-white rounded">+ New Chat</button>
                )}
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                <div className="bg-white p-4 shadow">
                    <h1 className="text-2xl font-bold">ChatBot Sugarcane</h1>
                </div>
                
                {/* Chat Content */}
                <div 
                    ref={chatBoxRef}
                    className="flex-1 p-4 overflow-y-auto bg-white"
                >
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`mb-2 p-3 rounded-lg ${
                                msg.role === 'user' 
                                ? 'bg-blue-200 text-right' 
                                : msg.role === 'assistant' 
                                ? 'bg-gray-100 text-left' 
                                : 'bg-red-100 text-left'
                            }`}
                        >
                            <strong>{msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'AI' : 'ระบบ'}:</strong> {msg.content}
                        </div>
                    ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 bg-white">
                    <div className="flex">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-lg"
                            placeholder="พิมพ์ข้อความที่นี่..."
                        />
                        <button
                            onClick={() => sendMessage()}
                            className="bg-green-500 text-white px-6 py-3 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                        >
                            ส่ง
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;