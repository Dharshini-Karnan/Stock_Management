import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Select,
  Flex,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Viewuser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John", role: "Staff" },
    { id: 2, name: "Pazham", role: "Manager" },
    { id: 3, name: "Vikram", role: "Staff" },
    { id: 4, name: "Joe", role: "Manager" },
    { id: 5, name: "Warn", role: "Staff" },
    // Add more users here
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedRole, setEditedRole] = useState("");
  const { colorMode } = useColorMode();

  const handleEdit = (user) => {
    setIsEditing(true);
    setEditingUser(user);
    setEditedName(user.name);
    setEditedRole(user.role);
  };

  const handleUpdate = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id
        ? { ...user, name: editedName, role: editedRole }
        : user
    );
    setUsers(updatedUsers);
    setIsEditing(false);
    setEditingUser(null);
    setEditedName("");
    setEditedRole("");
  };

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  useEffect(() => {
    // Simulating an asynchronous data fetch
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const tableContainerStyles = {
    width: "700px",
    height: "500px",
    border: "1px solid #ccc",
    padding: "50px",
    borderRadius: "20px",
    boxShadow: "2px 2px 2px rgba(51, 153, 153, 0.5)",
    background:
      colorMode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)",
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="teal.500" />
      </Center>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <Center>
          <Box {...containerStyles}>
            <TableContainer style={{ ...tableContainerStyles, height: "auto" }}>
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>S.No</Th>
                    <Th>Name</Th>
                    <Th>Role</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {users.map((user) => (
                    <Tr key={user.id}>
                      <Td>{user.id}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.role}</Td>
                      <Td>
                        <IconButton
                          aria-label="Edit"
                          icon={<FaEdit />}
                          onClick={() => handleEdit(user)}
                          marginRight="4px"
                        />
                        <IconButton
                          aria-label="Delete"
                          icon={<FaTrash />}
                          onClick={() => handleDelete(user.id)}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Center>
      </div>
      <Modal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        isCentered
        motionPreset="slideInBottom"
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent
          position="relative"
          backdropFilter="blur(5px)"
          borderRadius="20px"
        >
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="column">
              <Text>Name:</Text>
              <Input
                placeholder="Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Flex>
            <Flex direction="column" mt={4}>
              <Text>Role:</Text>
              <Select
                placeholder="Role"
                value={editedRole}
                onChange={(e) => setEditedRole(e.target.value)}
              >
                <option value="Staff">Staff</option>
                <option value="Manager">Manager</option>
              </Select>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <style jsx>{`
        .container {
          background: ${colorMode === "light"
            ? "linear-gradient(to right,  #000000, #093637)"
            : "linear-gradient(to right, #0f2027, #203a43, #2c5364)"};
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default Viewuser;
