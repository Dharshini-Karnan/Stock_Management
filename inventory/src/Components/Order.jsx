import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
  Select,
  Input,
  IconButton,
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
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductSKU, setNewProductSKU] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductQuantity, setNewProductQuantity] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { colorMode } = useColorMode();
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const [selectedProductQuantity, setSelectedProductQuantity] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Calculate the total price whenever quantity or price changes
    if (newProductQuantity && (selectedProductPrice || newProductPrice)) {
      const priceToUse =
        selectedProductPrice !== "" ? selectedProductPrice : newProductPrice;
      const total = parseInt(newProductQuantity) * parseFloat(priceToUse);
      setTotalPrice(total.toFixed(2)); // Round to 2 decimal places
    } else {
      setTotalPrice(0);
    }
  }, [newProductQuantity, selectedProductPrice, newProductPrice]);
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const axiosInterceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (token == null) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    console.log("Token: ", token);

    axios
      .get("http://localhost:2999/page/orders")
      .then((response) => {
        setTableData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, []);
  const calculateTotal = (quantity, price) => {
    const parsedQuantity = parseInt(quantity, 10);
    const parsedPrice = parseFloat(price);
    return (parsedQuantity * parsedPrice).toFixed(0);
  };
  const handleAddProduct = () => {
    const priceToUse =
      selectedProductPrice !== "" ? selectedProductPrice : newProductPrice;
    const total = calculateTotal(newProductQuantity, selectedProductPrice);
    const newProduct = {
      customername: newProductTitle,
      status: newProductDescription,
      price: priceToUse,
      quantity: newProductQuantity,
      total: total,
    };
    if (
      parseInt(newProductQuantity, 10) > parseInt(selectedProductQuantity, 10)
    ) {
      // Quantity exceeds available quantity, do not proceed further
      return;
    }
    if (isEditing) {
      axios
        .put(
          `http://localhost:2999/page/orders/${editedProduct.id}`,
          newProduct
        )
        .then((response) => {
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
        .post("http://localhost:2999/page/orders", {
          customername: newProductTitle,
          status: newProductDescription,
          price: priceToUse,
          quantity: newProductQuantity,
          total: total,
        })
        .then((response) => {
          // Update the available product quantity in the state
          if (selectedProduct) {
            const updatedAvailableProducts = availableProducts.map((product) =>
              product.id === selectedProduct.id
                ? {
                    ...product,
                    quantity:
                      product.quantity - parseInt(newProductQuantity, 10),
                  }
                : product
            );

            setAvailableProducts(updatedAvailableProducts);

            // Update the table data with the new order
            setTableData((prevTableData) => [...prevTableData, response.data]);

            setIsModalOpen(false);
            setNewProductTitle("");
            setNewProductDescription("");
            setNewProductSKU("");
            setNewProductPrice("");
            setNewProductQuantity("");

            // Update the product's quantity in the "products" table in the database
            axios
              .put(
                `http://localhost:2999/page/products/${selectedProduct.id}`,
                {
                  ...selectedProduct, // Include all other properties of the product
                  quantity: updatedAvailableProducts.find(
                    (product) => product.id === selectedProduct.id
                  ).quantity,
                }
              )
              .then((response) => {
                console.log(
                  "Product quantity updated successfully in the database!"
                );
              })
              .catch((error) => {
                console.error(
                  "Error updating product quantity in the database:",
                  error
                );
              });
          } else {
            console.error("No product selected.");
          }
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }

    setNewProductTitle("");
    setNewProductDescription("");
    setNewProductSKU("");
    setNewProductPrice("");
    setNewProductQuantity("");
  };

  const handleEditProduct = (row) => {
    setIsEditing(true);
    setEditedProduct(row);
    setIsModalOpen(true);
    setNewProductTitle(row.customername);
    setNewProductDescription(row.status);
    setNewProductSKU(row.total);
    setNewProductPrice(row.price);
    setNewProductQuantity(row.quantity);
  };

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:2999/page/orders/${id}`)
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

  const [availableProducts, setAvailableProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:2999/page/products")
      .then((response) => {
        setAvailableProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching available products:", error);
      });
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
    width: "900px",
    height: "500px",
    padding: "50px",
    background: "rgba(0, 0, 0, 0.8)",
  };


  const tableContainerStyles =
    colorMode === "light"
      ? lightModeTableContainerStyles
      : darkModeTableContainerStyles;
  const pdfRef = useRef();

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set the table headers
    const headers = ["S.No", "Customer Name", "Product", "Quantity", "Total"];
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("ORDERS LIST", 105, 10, null, null, "center");

    // Map through the table data and create an array of arrays with the data
    const data = tableData.map((row, index) => [
      index + 1,
      row.customername,
      row.status,
      row.quantity,
      row.total,
    ]);
      
    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      theme: "grid", // Apply a grid theme
      styles: {
        font: "Arial",
        fontSize: 12,
        textColor: [0, 0, 0], // Black text color
        cellPadding: 5,
        cellWidth: "wrap",
        fillStyle: "F", // Filled cells
        halign: "center", // Center-aligned text
        valign: "middle", // Middle-aligned text
      },
      columnStyles: {
        0: { cellWidth: 20 }, // Adjust width of the first column
        2: { cellWidth: "auto" }, // Adjust width of the third column dynamically
        4: { halign: "right" }, // Align the content of the fifth column to the right
      },
      margin: { top: 20 },
    });
    const totalSum = tableData.reduce((sum, row) => sum + parseFloat(row.total), 0);

    // Add a new row with the total information
    const totalRow = ["", "", "", "Total Sum", totalSum.toFixed(2)];
    
    doc.autoTable({
      body: [totalRow],
      theme: "grid", // Apply a grid theme
      styles: {
        font: "Arial",
        fontSize: 12,
        textColor: [0, 0, 0], // Black text color
        cellPadding: 5,
        cellWidth: "wrap",
        fillStyle: "F", // Filled cells
        halign: "center", // Center-aligned text
        valign: "middle", // Middle-aligned text
      },
      columnStyles: {
        0: { cellWidth: 20 }, 
        2: { cellWidth: "auto" },
        4: { halign: "right",fontStyle: 'bold' }, 
      },
      margin: { top: 10 },
    });
    
    const timestamp = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(
      `Downloaded on: ${timestamp}`,
      105,
      doc.autoTable.previous.finalY + 10,
      null,
      null,
      "center"
    );
    // Save the PDF
    doc.save("orders.pdf");
  };
  const scrollableContainerClass =
  tableData.length > 6 ? "scrollable-container" : "";
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
            <WrapItem
              style={{ position: "absolute", top: 200, right: 340 }}
            ></WrapItem>
            <div className="container">
              <Center>
                <Box style={containerStyles}>
                  <TableContainer
                    className={`tableContainer ${scrollableContainerClass}`}
                    style={{ ...tableContainerStyles, height: "auto" }}
                  >
                    <Button
                    left={1}
                    top={-6}
                      
                      background={
                        "radial-gradient(3595.98% 514.41% at 115.79% 0%, #8D53EF 0%, #0C4D79 100%)"
                      }
                      textColor={"white"}
                      _hover={{ bg: "white", color: "black" }}
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add Orders ⬆️
                    </Button>
                    <Button
                    left={555}
                    top={-6}
                      
                      background={
                        "radial-gradient(3595.98% 514.41% at 115.79% 0%, #8D53EF 0%, #0C4D79 100%)"
                      }
                      textColor={"white"}
                      _hover={{ bg: "white", color: "black" }}
                      onClick={handleDownloadPDF}
                    >
                      Report ⬇️
                    </Button>
                    <Table
                      background={"#291B51"}
                      textColor={"white"}
                      border={"1px solid #ccc"}
                    >
                      <Thead background={"#190B51"}>
                        <Tr>
                          <Th textColor={"white"}>S.No</Th>
                          <Th textColor={"white"}>CustomerName</Th>
                          <Th textColor={"white"}>Product</Th>
                          {/* <Th isNumeric>Price</Th> */}
                          <Th isNumeric textColor={"white"}>
                            Quantity
                          </Th>
                          <Th isNumeric textColor={"white"}>
                            Total
                          </Th>
                          <Th textColor={"white"}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tableData.map((row, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{row.customername}</Td>
                            <Td>{row.status}</Td>
                            {/* <Td>{row.price}</Td> */}
                            <Td isNumeric>{row.quantity}</Td>
                            <Td isNumeric>{row.total}</Td>
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
                    <FormLabel>Customer Name</FormLabel>
                    <Input
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />

                    {/* <Select
                    value={newProductDescription}
                    onChange={(e) => {
                      setNewProductDescription(e.target.value);
                      // Find the selected product in the availableProducts array
                      const selectedProduct = availableProducts.find(
                        (product) => product.name === e.target.value
                      );
                      if (selectedProduct) {
                        setSelectedProductQuantity(selectedProduct.quantity);
                        setSelectedProductPrice(selectedProduct.price); // Fetch the price
                      } else {
                        setSelectedProductQuantity("");
                        setSelectedProductPrice("");
                      }
                    }}
                  >
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </Select> */}
                    <Select
                      value={selectedProduct ? selectedProduct.name : ""}
                      onChange={(e) => {
                        const productName = e.target.value;
                        setNewProductDescription(productName);
                        // Find the selected product in the availableProducts array
                        const selectedProduct = availableProducts.find(
                          (product) => product.name === productName
                        );
                        setSelectedProduct(selectedProduct); // Set the selected product in the state
                        if (selectedProduct) {
                          setSelectedProductQuantity(selectedProduct.quantity);
                          setSelectedProductPrice(selectedProduct.price);
                        } else {
                          setSelectedProductQuantity("");
                          setSelectedProductPrice("");
                        }
                      }}
                    >
                      {availableProducts.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </Select>

                    {selectedProductQuantity && (
                      <Text color="teal.500">
                        Quantity: {selectedProductQuantity}
                      </Text>
                    )}

                    <FormLabel>Quantity</FormLabel>
                    <Input
                      value={newProductQuantity}
                      onChange={(e) => setNewProductQuantity(e.target.value)}
                      type="text" // Set the input type to "text"
                      pattern="[0-9]*"
                      className={
                        parseInt(newProductQuantity, 10) >
                        parseInt(selectedProductQuantity, 10)
                          ? "invalidQuantity"
                          : ""
                      }
                    />
                    <FormLabel>Price</FormLabel>
                    {selectedProductPrice !== "" && ( // Only render if selectedProductPrice is not empty
                      <Input
                        value={selectedProductPrice} // Use the selected product's price as the value
                        onChange={(e) =>
                          setSelectedProductPrice(e.target.value)
                        }
                        disabled // Disable the price input field
                        color="black" // Set the text color to black
                      />
                    )}
                    <FormLabel>Total</FormLabel>

                    <Input
                      value={totalPrice} // Use the selected product's price as the value
                      onChange={(e) => setTotalPrice(e.target.value)}
                      disabled // Disable the price input field
                      color="black" // Set the text color to black
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
      <style jsx>{`
        .invalidQuantity {
          color: red;
        }
      `}</style>
      <style jsx>{`
  .scrollable-container {
    overflow-y: scroll;
    max-height: 500px; /* Set the maximum height as needed */
  }
`}</style>
    </div>
  );
};

export default Orders;
