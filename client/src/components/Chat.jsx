import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [room, setRoom] = useState("");
    const [currentRoom, setCurrentRoom] = useState("");

    useEffect(() => {
        socket.on('chat message', ({ message, sender }) => {
            setMessages((prevMessages) => [...prevMessages, { message, sender }]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input && currentRoom) {
            socket.emit('chat message', {
                room: currentRoom,
                message: input
            });
            setInput("");
        }
    };

    const joinRoom = () => {
        if (room) {
            socket.emit('join room', room);
            setCurrentRoom(room);
            setMessages([]);
            setRoom("");
        }
    }

    return (
        <div id="chat-container">
            <div>
                <input
                    value = {room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room"
                />
                <button onClick={joinRoom}>Join Room</button>
                {currentRoom && <p>Current room: {currentRoom}</p>}
            </div>
            <ul id="messages">
                {messages.map((msg, index) => (
                    <li key={index} className={msg.sender === socket.id ? 'sent': 'received'}>
                        {msg.message}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => {setInput(e.target.value)}}
                autoComplete="off"
                placeholder="Enter your message"
                disabled={!currentRoom}
            />
            <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chat;