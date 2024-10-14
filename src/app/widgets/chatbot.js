"use client";

import Image from 'next/image';
import React, { useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() !== '') {
            setMessages([...messages, { type: 'user', text: inputValue }]);
            setInputValue('');
            // Here you can integrate a chatbot API to get a response
            // and append it to the messages state
        }
    };

    return (
        <div>
            {/* Chatbot Button */}
            <div
                className="fixed bottom-4 right-4"
                onClick={toggleChat}
                style={{ cursor: 'pointer', zIndex: 1000 }}
            >
                <button className="btn btn-primary text-white p-3 rounded-full shadow-lg hover:bg-black transition duration-300 ">
                    <div className='flex items-center text-bold text-2l justify-center'>
                        <Image
                            src="/images/chat.png"
                            alt="Profile"
                            width={40}
                            height={40}
                        />
                        Chat
                    </div>
                </button>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="fixed bottom-16 right-4 w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col"
                    style={{ zIndex: 1000 }}
                >
                    <div className="bg-[#8006be] text-white p-2 rounded-t-lg flex justify-between items-center">
                        <span>Chat with us</span>
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto">
                        {messages.map((message, index) => (
                            <div key={index} className={`text-${message.type === 'user' ? 'gray-500' : 'blue-500'}`}>
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-2 flex border-t">
                        <input
                            type="text"
                            placeholder="Ask your self..."
                            className="w-full p-2 border rounded-lg focus:outline-none z-1" // Add z-index
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <button onClick={handleSendMessage} className="btn btn-primary text-white p-2 rounded-lg">Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
