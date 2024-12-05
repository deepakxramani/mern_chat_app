import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, Input, useToast, Spinner} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons"
import React, { useState } from 'react'
import { ChatState } from "../../context/ChatProvider"
import ProfileModal  from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../userAvatar/UserListItem';

const SideDrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState();

  const { user, setSelectedChat, chats, setChats} = ChatState();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()


  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    navigate('/')
  }

  const handleSearch = async () => {
    if(!search) {
        toast({
            title: `Please Enter something in search`,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "top-left",
          })
          return;
    }

    try {
        setLoading(true)
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`
            },
        };
        const { data } = await axios.get(`/api/user?search=${search}`, config);
        setLoading(false);
        setSearchResult(data);
    } catch (err) {
        toast({
            title: `Error Occured!`,
            description: "Failed to load the Search Results",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom-left",
          })
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setChatLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setChatLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
        >
            <Tooltip label="Search users to chat" hasArrow placement='bottom-end'>
                <Button variant={'ghost'} onClick={onOpen}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <Text display={{base: "none", md: "flex"}} px="4">
                    Search User
                </Text>
                </Button>
            </Tooltip>

            <Text fontSize="2xl" fontFamily="Work sans">
                Chat-O-Nation
            </Text>

            <div>
                <Menu>
                    <MenuButton p={1}>
                        <BellIcon fontSize="2xl" m={1}/>
                    </MenuButton>
                    {/* <MenuList></MenuList> */}
                </Menu>
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        
                    </MenuList>
                </Menu>
            </div>
        </Box>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Search User</DrawerHeader>

                <DrawerBody>
                <Box display='flex' pb={2}>
                    <Input 
                        placeholder='Search by name or email'
                        mr={2}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button onClick={handleSearch}>Go </Button>
                </Box>
                {loading ? (
                    <ChatLoading />
                ): (
                    searchResult?.map((user) => (
                        <UserListItem 
                            key={user._id}
                            user={user}
                            handleFunction={()=>accessChat(user._id)}
                        />
                    ))
                )}
                {chatLoading && <Spinner ml="auto" display="flex" />}
            </DrawerBody>
            </DrawerContent>
            
        </Drawer>
    </>
  )
}

export default SideDrawer