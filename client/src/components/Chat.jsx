import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        socket.on('chat message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('chat message');
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input) {
            socket.emit('chat message', input);
            setInput("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={(e) => {setInput(e.target.value)}}
                autoComplete="off"/>
            <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Chat;