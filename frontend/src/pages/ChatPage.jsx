import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider.jsx';
import SideDrawer from '../components/miscellaneous/SideDrawer.jsx';
import MyChats from '../components/MyChats.jsx';
import ChatBox from '../components/ChatBox.jsx'
import { Box } from '@chakra-ui/react';

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{width: '100%'}}>
      { user && <SideDrawer /> }
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
        p="10"
      >
        { user && <MyChats />}
        { user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
