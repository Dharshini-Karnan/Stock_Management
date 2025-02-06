import { useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  Container,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Image,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { Line } from "react-chartjs-2";
const NavLink = ({ children, href }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: "#8D53EF",
    }}
    href={href}
  >
    {children}
  </Link>
);

export default function NavBar() {
  
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [monthlyPopupOpen, setMonthlyPopupOpen] = useState(false);
  const Links = [
    { name: "Orders", href: "/order" },
    { name: "Products", href: "/products" },
    { name: "Stocks", href: "/stocks" },
  ];

  const handleMonthlyDownload = (event) => {
    event.preventDefault();
    setMonthlyPopupOpen(false);
  };
  const username = useSelector((state) => state.username);
  const handleSignOut = () => {
    localStorage.clear();
  };
  return (
    <>
      <Box bg={useColorModeValue("#0C081C", "gray.900")} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={10} alignItems={"center"}>
            <Box color={"teal.500"}>
              <Link href="/index" textDecoration="none">
                <Image
                  src="https://res.cloudinary.com/dyizhabab/image/upload/v1697568353/output-onlinegiftools_1_eus1gr.gif"
                  alt="Inventory"
                  boxSize="57px"
                />
              </Link>
            </Box>
            <HStack
              as={"nav"}
              textColor={"white"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} href={link.href}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
            <Text
              textColor={"purple"}
              fontSize="25px"
              as={"b"}
              style={{ position: "relative", left: "300px" }}
            >
              INVENTORY
            </Text>
            {/* <Menu>
              <MenuButton
                onClick={() => setMonthlyPopupOpen(true)}
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.700"),
                  borderRadius: "md",
                }}
              >
                Reports
              </MenuButton>
            </Menu> */}
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </Center>
                  <br />
                  <Container>
                    <Text color={"teal.700"}>{username}</Text>
                  </Container>
                  <br />
                  <MenuDivider />

                  <MenuItem>
                    <Link
                      href="/login"
                      color="teal.500"
                      _hover={{
                        textDecoration: "none",
                      }}
                    >
                      Notification
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      href="/"
                      color="teal.500"
                      _hover={{
                        textDecoration: "none",
                      }}
                      textDecor="none"
                      onClick={handleSignOut}
                    >
                      Signout
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>

      {monthlyPopupOpen && (
        <Modal
          isOpen={monthlyPopupOpen}
          onClose={() => setMonthlyPopupOpen(false)}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Analysis Report</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleMonthlyDownload}>
                <FormControl>
                  <FormLabel htmlFor="fromDate">From Date</FormLabel>
                  <Input type="date" id="fromDate" required />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel htmlFor="toDate">To Date</FormLabel>
                  <Input type="date" id="toDate" required />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="teal"
                  mt={4}
                  onClick={() => setMonthlyPopupOpen(false)}
                >
                  Download
                </Button>
              </form>
              
            </ModalBody>
            <ModalFooter>
              <Button
                variant="ghost"
                onClick={() => setMonthlyPopupOpen(false)}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
