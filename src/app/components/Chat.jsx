"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet"></link>

const Chat = () => {
    const { data: session } = useSession();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const addMessage = (role, content) => {
        setMessages(prevMessages => [...prevMessages, { role, content }]);
    };

    const sendMessage = async () => {
        if (inputMessage.trim()) {
            addMessage("user", inputMessage);
            setInputMessage("");

            try {
                const response = await axios.post('http://localhost:8080/v1/chat/completions', {
                    model: "/root/LLaMA-Factory/models/llama3_lora_sft",
                    messages: [...messages, { role: "user", content: inputMessage }]
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

    return ( 
      

        <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-green-200 to-green-400 p-5 font-sans">
    <h1 className="text-3xl font-bold mb-6 text-white text-center">ChatBot Sugarcane</h1>
    
    {/* พื้นที่แชท */}
    <div className="w-full max-w-3xl flex-grow">
        <div 
            ref={chatBoxRef} 
            className="h-[800px] border border-gray-300 overflow-y-auto mb-4 p-4 bg-white rounded shadow-lg font-inter text-lg leading-relaxed"
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
                    <strong>{msg.role === 'user' ? 'คุณ' : msg.role === 'assistant' ? 'AI' : 'ระบบ'}:</strong> {msg.content}
                </div>
            ))}
        </div>
    </div>
    
    {/* กล่อง input */}
    <div className="w-full max-w-3xl p-5 bg-gradient-to-r from-green-200 to-green-400">
        <div className="flex justify-center ">
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-lg font-inter"
                placeholder="พิมพ์ข้อความที่นี่..."
            />
            <button
                onClick={sendMessage}
                className="bg-green-500 text-white px-6 py-3 rounded-r-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 "
            >
                ส่ง
            </button>
        </div>
    </div>
</div>




    );
}

export default Chat;
