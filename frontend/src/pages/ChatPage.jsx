import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>
          <p style={{ color: 'black' }}>{chat.chatName}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatPage;
