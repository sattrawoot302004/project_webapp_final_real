"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useSession } from "next-auth/react";
import { User, Bot, AlertCircle, Send } from 'lucide-react';

const ChatPage = () => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [typingText, setTypingText] = useState('');
    const chatBoxRef = useRef(null);

    // Load messages from local storage
    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(savedMessages);
    }, []);

    // Save messages to local storage
    useEffect(() => {
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages, typingText]);

    // Loading dots animation
    useEffect(() => {
        let count = 0;
        let interval;
        
        if (isLoading) {
            interval = setInterval(() => {
                count = (count + 1) % 4;
                const dots = '.'.repeat(count);
                setTypingText(`กำลังพิมพ์${dots}`);
            }, 500);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isLoading]);

    // Typing animation
    const typeMessage = async (content) => {
        let currentText = '';
        for (let i = 0; i < content.length; i++) {
            currentText += content[i];
            setTypingText(currentText);
            await new Promise(resolve => setTimeout(resolve, 30)); // Typing speed
        }
        setTypingText('');
        return currentText;
    };

    const addMessage = async (role, content, shouldType = false) => {
        if (shouldType) {
            await typeMessage(content);
            setMessages(prevMessages => [...prevMessages, { role, content }]);
        } else {
            setMessages(prevMessages => [...prevMessages, { role, content }]);
        }
    };

    const sendMessage = async (messageToSend = inputMessage) => {
        if (messageToSend.trim()) {
            addMessage("user", messageToSend);
            setInputMessage("");
            setIsLoading(true);

            try {
                const response = await axios.post('http://localhost:8000/v1/chat/completions', {
                    model: "/work_space/LLaMA-Factory/models/llama3_lora_sft",
                    messages: [...messages, { role: "user", content: messageToSend }]
                }, {
                    headers: {
                        'Authorization': 'Bearer token-abc123',
                        'Content-Type': 'application/json'
                    }
                });

                setIsLoading(false);
                const aiMessage = response.data.choices[0].message.content;
                await addMessage("assistant", aiMessage, true);

            } catch (error) {
                console.error('Error:', error);
                setIsLoading(false);
                addMessage("system", "เกิดข้อผิดพลาดขณะส่งข้อความ");
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const clearChat = () => {
        setMessages([]);
        localStorage.removeItem('messages');
    };

    return (
            <div className="min-h-screen bg-green-50">
                <div>
                    <Navbar session={session} />
                </div>
    
                <div className="flex min-h-[calc(100vh-64px)]">
                    {/* Sidebar */}
                    {session && (
                        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-[#51A74D] p-4 transition-all duration-300`}>
                            <button 
                                onClick={toggleSidebar} 
                                className="mb-4 p-2 bg-white hover:bg-grey text-black rounded-lg transition-colors duration-200 w-full"
                            >
                                ☰
                            </button>
                            {isSidebarOpen && (
                                <button 
                                    onClick={clearChat} 
                                    className="w-full mb-4 p-2 bg-white hover:bg-grey text-black rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                                >
                                    <span>+</span> New Chat
                                </button>
                            )}
                        </div>
                    )}
    
                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col bg-green-50">
                        
    
                        {/* Chat Content */}
                        <div 
                            ref={chatBoxRef}
                            className="flex-1 p-6 overflow-y-auto bg-green-50"
                        >
                            {messages.map((msg, index) => (
                                <div key={index} className="mb-8">
                                    <div className={`flex items-start gap-4 ${
                                        msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                                    }`}>
                                        {/* Icon Container */}
                                        <div className={`flex-shrink-0 rounded-full p-3 ${
                                            msg.role === 'user' 
                                                ? 'bg-green-600' 
                                                : msg.role === 'assistant'
                                                ? 'bg-white border-2 border-green-600'
                                                : 'bg-red-100'
                                        }`}>
                                            {msg.role === 'user' ? (
                                                <User className="h-6 w-6 text-white" />
                                            ) : msg.role === 'assistant' ? (
                                                <Bot className="h-6 w-6 text-green-600" />
                                            ) : (
                                                <AlertCircle className="h-6 w-6 text-red-500" />
                                            )}
                                        </div>
    
                                        {/* Message Content - ปรับปรุงการแสดงข้อความ */}
                                        <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`px-6 py-4 rounded-2xl shadow-sm max-w-[85%] ${
                                                msg.role === 'user' 
                                                ? 'bg-green-600 text-white' 
                                                : msg.role === 'assistant' 
                                                ? 'bg-white border border-green-200' 
                                                : 'bg-red-100'
                                            } animate-fade-in`}>
                                                <span className={`text-base whitespace-pre-wrap break-words ${
                                                    msg.role === 'user' ? 'text-white' : 'text-gray-700'
                                                }`}>
                                                    {msg.content}
                                                </span>
                                            </div>
                                            <span className={`text-sm mt-2 px-2 ${
                                                msg.role === 'user' 
                                                ? 'text-green-700' 
                                                : 'text-green-600'
                                            }`}>
                                                {msg.role === 'user' ? 'You' : msg.role === 'assistant' ? 'AI Assistant' : 'System'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
    
                            {/* Loading/Typing Indicator */}
                            {(isLoading || typingText) && (
                                <div className="flex items-start gap-4 mb-8">
                                    <div className="flex-shrink-0 rounded-full p-3 bg-white border-2 border-green-600">
                                        <Bot className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <div className="px-6 py-4 rounded-2xl shadow-sm max-w-[85%] bg-white border border-green-200 animate-fade-in">
                                            <span className="text-base text-gray-700">
                                                {isLoading ? "กำลังคิด" : typingText}
                                            </span>
                                        </div>
                                        <span className="text-sm mt-2 px-2 text-green-600">
                                            AI Assistant
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
    
                        {/* Message Input - ปรับปรุงปุ่มส่งให้เป็น icon */}
                        <div className="p-6 bg-green-50 border-t border-green-100 shadow-lg">
                            <div className="flex max-w-4xl mx-auto">
                                <input
                                    type="text"
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    disabled={isLoading}
                                    className="flex-grow p-4 border border-green-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 text-lg bg-white disabled:bg-gray-100"
                                    placeholder="พิมพ์ข้อความที่นี่..."
                                />
                                <button
                                    onClick={() => sendMessage()}
                                    disabled={isLoading}
                                    className={`px-6 py-4 rounded-r-xl transition-all duration-200 flex items-center justify-center
                                        ${isLoading 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                                        }`}
                                    title={isLoading ? 'กำลังส่ง...' : 'ส่ง'}
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin" />
                                    ) : (
                                        <Send className="h-6 w-6 text-white" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    
                <style jsx global>{`
                    @keyframes fade-in {
                        from {
                            opacity: 0;
                            transform: translateY(10px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .animate-fade-in {
                        animation: fade-in 0.5s ease-out;
                    }
                `}</style>
            </div>
        );
    };
    
    export default ChatPage;