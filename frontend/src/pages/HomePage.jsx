import React, { useEffect } from 'react';
import { Container, Box, Text, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';

const HomePage = () => {
  const navigate = useNavigate()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) {
      navigate("/chats")
    }
  }, [navigate])

  return (
    <Container maxW={'xl'} centerContent>
      <Box 
        display={'flex'}
        justifyContent="center"
        p={3}
        bg={"white"}
        w={"100%"}
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize="4xl" fontFamily={"Work Sans, sans-serif"}>Chat-O-Nation</Text>
      </Box>

      <Box bg={"white"} color={"black"} w="100%" p={"4"} borderRadius={"lg"} borderWidth={"1px"}>
      <Tabs variant={"soft-rounded"} >
      <TabList mb={"1em"}>
        <Tab width="50%">Login</Tab>
        <Tab width="50%">Sign Up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <SignUp />
        </TabPanel>
      </TabPanels>
    </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
