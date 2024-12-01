import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { FormControl, FormLabel, VStack, Input, InputGroup, InputRightElement, Button, useToast } from "@chakra-ui/react"
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show)

  const submitHandler = async () => {
    setLoading(true);
    if(!email || !password) {
      toast({
        title: `Please Fill all the Fields`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false)
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type":"application/json",
        },
      };

      const {data} = await axios.post(
        "/api/user/login",
        {email, password},
        config
      );

      toast({
        title: `Login Successful`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats")

    } catch (error) {
        toast({
        title: `Error Occured!`,
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
      setLoading(false);
    }
  }

  return (
    <VStack spacing="5px" color={"black"}>
       <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
                <Input  
                    placeholder='Enter Your Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}  
                />
       </FormControl>

       <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder='Enter Your Password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <InputRightElement width={"4.5rem"}>
                        <Button h={"1.75"} size={"sm"} onClick={handleClick}>
                            { show ? "Hide" : "Show" }
                        </Button>
                    </InputRightElement>
                </InputGroup>
       </FormControl>
       
       <Button 
         colorScheme='blue'
         width={"100%"}
         style={{marginTop: 15}}
         onClick={submitHandler}
         isLoading={loading}
       >
            Login
       </Button>

       <Button
          variant={"solid"}
          colorScheme='red'
          width={"100%"}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("12345")
          }}
       >
          Get Guest User Credentials
       </Button>
    </VStack>
  )
}

export default Login;