import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Wrap,
  WrapItem,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Container,
  useColorMode,
  background,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  IconButton,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
const ServiceBox = ({ title, description, image, onDelete }) => (
  <Box
    role={"group"}
    p={6}
    maxW={"330px"}
    w={"full"}
    boxShadow={"2xl"}
    rounded={"lg"}
    pos={"relative"}
    zIndex={1}
  >
    <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
      <Image
        rounded={"lg"}
        height={230}
        width={282}
        objectFit={"cover"}
        src={image}
      />
    </Box>
    <Button
      onClick={onDelete}
      position="absolute"
      top={2}
      right={2}
      variant="solid"
      colorScheme="red"
      size="sm"
    >
      <DeleteIcon />
    </Button>
    <Stack pt={10} align={"center"}>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        {title}
      </Text>
      <Heading
        fontSize={"2xl"}
        fontFamily={"body"}
        fontWeight={500}
        color={"gray.500"}
      >
        {description}
      </Heading>
    </Stack>
  </Box>
);

const Warehouse = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductSKU, setNewProductSKU] = useState(""); // Adding the SKU field
  const [newProductPrice, setNewProductPrice] = useState(""); // Adding the price field
  const [newProductQuantity, setNewProductQuantity] = useState(""); // Adding the quantity field

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        // localStorage.removeItem("jwtToken");
        if (token == null) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    axios
      .get("http://localhost:2999/page/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      setProducts([
        {
          title: "Pinky Chair",
          description: "$23.45",
          image:
            "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          title: "Umbrella",
          description: "$26.78",
          image:
            "https://res.cloudinary.com/dyizhabab/image/upload/f_auto,q_auto/v1/Inventory/lykyactfgwpc2onrqex1",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "700px",
    width: "100%",
  };

  const lightModeGradient = "#0c0810";
  const darkModeGradient =
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  const gradient = colorMode === "light" ? lightModeGradient : darkModeGradient;
  const lightModeBoxColor = "white";
  const darkModeBoxColor = "gray.800";
  const boxColor = useColorModeValue(lightModeBoxColor, darkModeBoxColor);
  const lightModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "0px 15px 250px -43px #8951E8",
    borderRadius: "45px",
    width: "900px",
    height: "500px",
    padding: "50px",
    background: "#0C081C",
  };

  const darkModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "2px 2px 2px rgba(51, 153, 153, 0.5)",
    borderRadius: "20px",
    width: "800px",
    height: "500px",
    padding: "50px",
    background: "rgba(0, 0, 0, 0.8)",
  };
  const token = localStorage.getItem("jwtToken");
  console.log(token);
  const [tableData, setTableData] = useState([]);
  const tableContainerStyles =
    colorMode === "light"
      ? lightModeTableContainerStyles
      : darkModeTableContainerStyles;
  useEffect(() => {
    axios
      .get("http://localhost:2999/api/v1/auth/warehouse")
      .then((response) => {
        setTableData(response.data);
        console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, []);
  const handleAddProduct = () => {
    const newProduct = {
      name: newProductTitle,
      manager: newProductDescription,
      location: newProductPrice,
      capacity: newProductQuantity,
    };
    if (isEditing) {
      axios
        .put(
          `http://localhost:2999/api/v1/auth/warehouse/${editedProduct.id}`,
          newProduct
        )
        .then((response) => {
          console.log("Edited");
          setTableData((prevTableData) =>
            prevTableData.map((row) =>
              row.id === editedProduct.id ? response.data : row
            )
          );
          setIsEditing(false);
          setIsModalOpen(false);
          setEditedProduct(null);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    } else {
      axios
        .post("http://localhost:2999/api/v1/auth/warehouse", newProduct)
        .then((response) => {
          console.log("Add");
          setTableData((prevTableData) => [...prevTableData, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }

    setNewProductTitle("");
    setNewProductDescription("");

    setNewProductPrice("");
    setNewProductQuantity("");
  };
  const handleEditProduct = (row) => {
    setIsEditing(true);
    setEditedProduct(row);
    setIsModalOpen(true);
    setNewProductTitle(row.name);
    setNewProductDescription(row.manager);
    // setNewProductSKU(row.total);
    setNewProductPrice(row.location);
    setNewProductQuantity(row.capacity);
  };
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:2999/api/v1/auth/warehouse/${id}`)
      .then((response) => {
        setTableData((prevTableData) =>
          prevTableData.filter((row) => row.id !== id)
        );
        console.log("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  return (
    <div>
      {isLoading ? (
        <Center h="100vh">
          <Spinner size="lg" color="teal.500" />
        </Center>
      ) : (
        <>
          <NavBar />
          <div
            className="content"
            style={{ ...containerStyles, background: gradient }}
          >
            <WrapItem style={{ position: "absolute", top: 100, right: 10 }}>
              
            </WrapItem>
            <div className="container">
              <Center>
                <Box style={containerStyles}>
                  <TableContainer
                    className="tableContainer"
                    style={{ ...tableContainerStyles, height: "auto" }}
                  >
                    <Button
                      left={645}
                      top={-6}
                      background={
                        "radial-gradient(3595.98% 514.41% at 115.79% 0%, #8D53EF 0%, #0C4D79 100%)"
                      }
                      textColor={"white"}
                      _hover={{ bg: "white", color: "black" }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add Warehouses
                    </Button>
                    <Table
                      background={"#291B51"}
                      textColor={"white"}
                      border={"1px solid #ccc"}
                    >
                      <Thead background={"#190B51"} textColor={"white"}>
                        <Tr>
                          <Th textColor={"white"}>S.No</Th>
                          <Th textColor={"white"}>WareHouseName</Th>
                          {/* <Th>Manager</Th> */}
                          <Th textColor={"white"}>Location</Th>
                          <Th isNumeric textColor={"white"}>
                            Quantity
                          </Th>
                          {/* <Th isNumeric>Total</Th> */}
                          <Th textColor={"white"}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tableData.map((row, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            {/* Replace with the actual property name for the product name */}
                            <Td>{row.name}</Td>{" "}
                            {/* Replace with the actual property name for the capacity */}
                            {/* <Td>{row.manager}</Td>{" "} */}
                            {/* Replace with the actual property name for the customer name */}
                            <Td>{row.location}</Td>{" "}
                            {/* Replace with the actual property name for the price */}
                            <Td isNumeric>{row.capacity}</Td>
                            <Td>
                              <IconButton
                                aria-label="Edit"
                                icon={<FaEdit />}
                                onClick={() => handleEditProduct(row)}
                                marginRight="4px"
                              />
                              <IconButton
                                aria-label="Delete"
                                icon={<FaTrash />}
                                onClick={() => handleDeleteProduct(row.id)}
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
            {/* <Center py={12}>
              <Wrap spacing={12} justify="center">
                {products.map((product, index) => (
                  <WrapItem key={index} bg={boxColor}>
                    <ServiceBox
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      onDelete={() => handleDeleteProduct(index)}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Center> */}
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                {isEditing ? "Edit Product" : "Add Orders"}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <Stack spacing={3}>
                    <FormLabel>Warehouse Name</FormLabel>
                    <Input
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />

                    <FormLabel>Location</FormLabel>
                    <Input
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                    <FormLabel>Capacity</FormLabel>
                    <Input
                      value={newProductQuantity}
                      onChange={(e) => setNewProductQuantity(e.target.value)}
                    />
                  </Stack>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
                  {isEditing ? "Update" : "Add"}
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Footer />
        </>
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default Warehouse;
