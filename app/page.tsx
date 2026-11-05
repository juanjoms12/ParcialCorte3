'use client';
import { useState } from 'react';
import { planets } from '@/features/planets/data/planets'; 

export default function HomePage() {

    const [SolarSystemScene, scene] = useState<PlaneLayout[]>();
    const [chats, setChats] = useState<Contact[]>(initialChats);
    const [selectedId, setSelectedId] = useState(1);
    const [message, setMessage] = useState('');
    const [showProfile, setShowProfile] = useState(false);

    const selectedChat = chats.find((chat) => chat.id === selectedId);

    function sendMessage() {
        if (!message.trim() || !selectedChat) return;

        const newMessage: Message = {
            id: Date.now(),
            text: message,
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
            sender: 'me',
        };

        setChats((prev) =>
            prev.map((chat) => (chat.id === selectedId ? { ...chat, messages: [...chat.messages, newMessage] } : chat)),
        );

        setMessage('');
    }

    
    

  return <h1>Home</h1>;
}
