import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import NavBar from "./NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Simulating an asynchronous data fetch
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after data is fetched
    }, 3000);
  }, []);
  const navigate=useNavigate();
  useEffect(() => {
   
    const jwtToken = localStorage.getItem("jwtToken");

   
    if (!jwtToken) {
      navigate("/");
    }
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const name = event.target.firstName.value;
    const role = event.target.role.value;
    const password = event.target.password.value;
    // Check if required fields are filled
    if (!email || !name || !role || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Password validation using regex
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain a special character."
      );
      return;
    }
    const userData = {
      name,
      email,
      password,
      role,
    };
    axios
      .post("http://localhost:2999/api/v1/auth/register", userData)
      .then((response) => {
        // navigate("/login", { state: { signupSuccess: true } });
        console.log(role);
      })
      .catch((error) => {
        // Handle the error (e.g., display a message)
        console.error(error);
        toast.error("Registration failed. Please try again later.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    // Start loading
    setIsLoading(true);

    // Simulating an asynchronous request
    setTimeout(() => {
      toast.success("User created successfully.");
      // Stop loading
      setIsLoading(false);
    }, 2000);
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    marginTop: "72px",
    marginBottom: "72px",
  };

  const lightModeGradient = "linear-gradient(to right, #000000, #093637)";
  const darkModeGradient =
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  const gradient = colorMode === "light" ? lightModeGradient : darkModeGradient;

  const lightModeBoxColor = "white";
  const darkModeBoxColor = "gray.800";
  const boxColor = useColorModeValue(lightModeBoxColor, darkModeBoxColor);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="teal.500" />
      </Center>
    );
  }

  // Render the form if not loading
  return (
    <div>
      <NavBar zIndex={20} />
      <div style={{ background: gradient }}>
        <Center>
          <Box
            {...containerStyles}
            role={"group"}
            p={6}
            maxW={"2xl"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={4}
            maxH={"600px"}
            bg={boxColor}
          >
            <Box
              role={"group"}
              p={6}
              maxW={"2xl"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={4}
            >
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" placeholder="Email" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input placeholder="First name" name="firstName" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select placeholder="Select role" name="role">
                    <option>User</option>
                    {/* <option>Manager</option> */}
                  </Select>
                  {/* <Input placeholder="Role" name="role" /> */}
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Button colorScheme="teal" mt={4} type="submit">
                  Create User
                </Button>
              </form>
            </Box>
          </Box>
        </Center>
      </div>
      <ToastContainer />
      <Footer style={{ marginTop: "300px" }} />
    </div>
  );
};

export default Users;
