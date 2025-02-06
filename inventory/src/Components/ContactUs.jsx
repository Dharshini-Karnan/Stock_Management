// Import the necessary components and libraries
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
} from "@chakra-ui/react";
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import axios from "axios";
import { useState } from "react";
export default function ContactUs() {
  // Function to handle form submission
  const[name,setUsername]=useState("");
  const[email,setEmailAddress]=useState("");
  const[message,setMessage]=useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmailAddress(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const name = event.target.elements.name.value;
    // const email = event.target.elements.email.value;
    // const message = event.target.elements.message.value;
   
    // setUsername(event.target.elements.name.value);
    // setEmailAddress(event.target.elements.email.value);
    // setMessage(event.target.elements.message.value);
   
    const formData = {
      name: name,
      email: email,
      feedback: message,
    };

    try {
     
      const response = await axios.post("http://localhost:2999/api/v1/users/addUserFeedback", formData);
      console.log("Response from backend:", response.data); 
      alert("Message sent successfully!");
    } catch (error) {
      
      console.error("Error sending message:", error);
      // alert("An error occurred. Please try again later.");
    }
  };
console.log(name);

  return (
    <Container bg="" maxW="full" mt={0} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="teal"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="black.500">
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start">
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        color="black"
                        leftIcon={<MdPhone color="black" size="20px" />}
                      >
                        +91-988888888
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        color="black"
                        leftIcon={<MdEmail color="black" size="20px" />}
                      >
                        hello@abc.com
                      </Button>
                      <Button
                        size="md"
                        height="48px"
                        width="200px"
                        color="black"
                        leftIcon={<MdLocationOn color="black" size="20px" />}
                      >
                        Coimbatore
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<BsPerson color="gray.800" />}
                          />
                          <Input type="text" name="name" size="md" onChange={handleUsernameChange}/>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="email">
                        <FormLabel>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement
                            pointerEvents="none"
                            children={<MdOutlineEmail color="gray.800" />}
                          />
                          <Input type="email" name="email" size="md" onChange={handleEmailChange}/>
                        </InputGroup>
                      </FormControl>
                      <FormControl id="message" onChange={handleMessageChange}>
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: "gray.300",
                          }}
                          placeholder="Message"
                          name="message"
                        />
                      </FormControl>
                      <FormControl id="name" float="right">
                        <Button
                          variant="solid"
                          bg="teal"
                          color="white"
                          _hover={{}}
                          onClick={handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
