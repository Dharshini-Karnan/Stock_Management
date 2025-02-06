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
  Select,
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
  Tr,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
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
const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductSKU, setNewProductSKU] = useState(""); // Adding the SKU field
  const [newProductPrice, setNewProductPrice] = useState(""); // Adding the price field
  const [newProductQuantity, setNewProductQuantity] = useState(""); // Adding the quantity field
  const [newProductWarehouse, setNewProductWarehouse] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [wareavail, setWareavail] = useState("");
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
   
  };

  const lightModeGradient = "#0c0810";
  const darkModeGradient =
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  const gradient = colorMode === "light" ? lightModeGradient : darkModeGradient;

  // Define the box color for light and dark mode
  const lightModeBoxColor = "white";
  const darkModeBoxColor = "gray.800";
  const boxColor = useColorModeValue(lightModeBoxColor, darkModeBoxColor);
  const lightModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "0px 15px 250px -43px #8951E8",
    borderRadius: "45px",
    width: "1150px",
    height: "500px",
    padding: "50px",
    background: "#0C081C",
  };

  const darkModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "2px 2px 2px rgba(51, 153, 153, 0.5)",
    borderRadius: "20px",
    width: "950px",
    height: "500px",
    padding: "50px",
    background: "rgba(0, 0, 0, 0.8)",
  };
  const token = localStorage.getItem("jwtToken");

  const [tableData, setTableData] = useState([]);
  const tableContainerStyles =
    colorMode === "light"
      ? lightModeTableContainerStyles
      : darkModeTableContainerStyles;
  const navigate = useNavigate();

  const [warehouseAvailability, setWarehouseAvailability] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:2999/api/v1/auth/warehouse")
      .then((response) => {
        setWarehouses(response.data);
        // Set the initial warehouse availability to an empty object
        const initialWarehouseAvailability = {};
        response.data.forEach((warehouse) => {
          initialWarehouseAvailability[warehouse.id] = 0;
        });
        setWarehouseAvailability(initialWarehouseAvailability);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching warehouses:", error);
        setIsLoading(false);
      });
  }, []);
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
        // console.log(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:2999/page/products")
      .then((response) => {
        setTableData(response.data);
        // Calculate the warehouse availability for each product
        const updatedWarehouseAvailability = { ...warehouseAvailability };
        response.data.forEach((product) => {
          updatedWarehouseAvailability[product.warehouse_id] +=
            product.quantity;
        });
        setWarehouseAvailability(updatedWarehouseAvailability);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, [warehouseAvailability]);

  const handleAddProduct = () => {
    const newProduct = {
      name: newProductTitle,
      d: newProductDescription,
      price: newProductPrice,
      quantity: newProductQuantity,
      sku: newProductSKU,
      ware: newProductWarehouse,
    };

    if (isEditing) {
      axios
        .put(
          `http://localhost:2999/page/products/${editedProduct.id}`,
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
        .post("http://localhost:2999/page/products", newProduct)
        .then((response) => {
          setTableData((prevTableData) => [...prevTableData, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          console.log(newProductDescription);
          console.log(newProductWarehouse);
          // console.log("Hi");
        });
    }

    setNewProductTitle("");
    setNewProductDescription("");
    setNewProductSKU("");
    setNewProductPrice("");
    setNewProductQuantity("");
    // setNewProductWarehouse("");
  };
  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost:2999/page/products/${id}`)
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
  const handleEditProduct = (row) => {
    setIsEditing(true);
    setEditedProduct(row);
    setIsModalOpen(true);
    setNewProductTitle(row.name);
    setNewProductDescription(row.d);
    setNewProductSKU(row.sku);
    setNewProductPrice(row.price);
    setNewProductQuantity(row.quantity);
  };

  const [warehouses, setWarehouses] = useState([]);
  const calculateTotalQuantityForWarehouse = (products, warehouseName) => {
    // Filter the products based on the warehouse name
    const filteredProducts = products.filter(
      (product) => product.ware.name === warehouseName
    );

    // Sum the quantities of the filtered products
    const totalQuantity = filteredProducts.reduce(
      (accumulator, product) => accumulator + product.quantity,
      0
    );

    return totalQuantity;
  };

  const getWarehouseQuantities = (products, warehousesw) => {
    const warehouseQuantities = {};

    warehouses.forEach((warehouse) => {
      const totalQuantity = calculateTotalQuantityForWarehouse(
        products,
        warehouse.name
      );

      warehouseQuantities[warehouse.name] = totalQuantity;
    });

    return warehouseQuantities;
  };

  // Usage example:
  const warehousesw = [
    { name: "Sundarki" },
    { name: "Warehouse 2" },
    { name: "Warehouse 3" },
  ];

  const warehouseQuantities = getWarehouseQuantities(tableData, warehousesw);
  // console.log("Warehouse Quantities:", warehouseQuantities[warehousesw.name]);
  const [warehouseAvailabilityDiff, setWarehouseAvailabilityDiff] = useState(
    {}
  );

  useEffect(() => {
    const warehouseAvailabilityDiff = {};
    tableData.forEach((product) => {
      const diff =
        product.ware.capacity - warehouseQuantities[product.ware.name];
      warehouseAvailabilityDiff[product.ware.name] = diff;
    });
    setWarehouseAvailabilityDiff(warehouseAvailabilityDiff);
    // console.log(warehouseAvailabilityDiff);
  }, [tableData]);
  // console.log(warehouseAvailabilityDiff);
  const isProductOutOfStock = (product, warehouseAvailability) => {
    const warehouseName = product.ware.name;
    const productQuantity = product.quantity;
    const warehouseAvail = warehouseAvailability[warehouseName] || 0;
    console.log(warehouseAvail);
    return productQuantity === 0 || warehouseAvail === 0;
  };
  useEffect(() => {
    axios
      .get("http://localhost:2999/page/products")
      .then((response) => {
        setTableData(response.data);
        // Calculate the warehouse availability for each product
        const updatedWarehouseAvailability = { ...warehouseAvailability };
        response.data.forEach((product) => {
          updatedWarehouseAvailability[product.ware.name] =
            updatedWarehouseAvailability[product.ware.name] || 0;
          updatedWarehouseAvailability[product.ware.name] += product.quantity;
        });
        setWarehouseAvailability(updatedWarehouseAvailability);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching table data:", error);
        setIsLoading(false);
      });
  }, [warehouseAvailability]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set the table headers
    const headers = [
      "S.No",
      "Product",
      "Description",
      "SKU",
      "Price",
      "Quantity",
      "Warehouse",
      "Availability",
    ];
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0);
    doc.text("PRODUCTS LIST", 105, 10, null, null, "center");

    // Map through the table data and create an array of arrays with the data
    const data = tableData.map((row, index) => [
      index + 1,
      row.name,
      row.d,
      row.sku,
      row.price,
      row.quantity,
      row.ware.name,
      warehouseAvailabilityDiff[row.ware.name]
    ]);

    // Add the table to the PDF
    doc.autoTable({
      head: [headers],
      body: data,
      theme: "grid",
      styles: {
        font: "Arial",
        fontSize: 12,
        textColor: [0, 0, 0], 
        cellPadding: 3,
        cellWidth: "wrap",
        fillStyle: "F",
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
    doc.save("products.pdf");
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
              style={{ position: "absolute", top: 100, right: 10 }}
            ></WrapItem>
            <div className="container">
              <Center>
                <Box style={containerStyles}>
                  <TableContainer
                    className="tableContainer"
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
                      Add Product ⬆️
                    </Button>
                    <Button
                       left={785}
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
                          <Th textColor={"white"}>Product</Th>
                          <Th textColor={"white"}>Description</Th>
                          <Th textColor={"white"}>SKU</Th>
                          <Th isNumeric textColor={"white"}>
                            Price
                          </Th>
                          <Th isNumeric textColor={"white"}>
                            Quantity
                          </Th>
                          <Th textColor={"white"}>Warehouse</Th>
                          {/* <Th>Capacity</Th>  */}
                          <Th isNumeric textColor={"white"}>
                            Availability
                          </Th>
                          {/* <Th isNumeric>Order_id</Th> */}
                          <Th textColor={"white"}>Actions</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {tableData.map((row, index) => (
                          // <Tr key={index}>
                          <Tr
                            key={index}
                            // Apply the inline CSS styles for disabled rows when quantity is 0
                            style={
                              row.quantity === 0 &&
                              isProductOutOfStock(
                                row,
                                warehouseAvailabilityDiff
                              )
                                ? {
                                    opacity: "0.5",
                                    color: "red",
                                  }
                                : {}
                            }
                          >
                            <Td>{index + 1}</Td>
                            <Td>{row.name}</Td> <Td>{row.d}</Td>{" "}
                            <Td>{row.sku}</Td> <Td isNumeric>{row.price}</Td>{" "}
                            <Td
                              isNumeric
                              style={{
                                color: row.quantity === 0 ? "red" : "inherit",
                              }}
                            >
                              {row.quantity}
                            </Td>
                            {/* <Th>{row.ware.name}</Th>  */}
                            <Td>{row.ware.name}</Td>
                            {/* <Td>{warehouseQuantities[row.ware.name] || 0}</Td> */}
                            {/* <Td>{ row.ware.capacity-warehouseQuantities[row.ware.name]}</Td>
                             */}
                            <Td>{warehouseAvailabilityDiff[row.ware.name]}</Td>
                            {/* <Td>{warehouseAvailability[row.warehouse_id]}</Td> */}
                            {/* <Td>{warehouseAvailability[row.ware]}</Td> Display warehouse availability */}
                            {/* <Td isNumeric>{row.order_id}</Td> */}
                            <Td>
                              <IconButton
                                aria-label="Delete"
                                icon={<FaTrash />}
                                onClick={() => handleDeleteProduct(row.id)}
                                marginRight="4px"
                              />

                              <IconButton
                                aria-label="Edit"
                                icon={<FaEdit />}
                                onClick={() => handleEditProduct(row)}
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
          {/* <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <Stack spacing={3}>
                    
                    <FormLabel>Name</FormLabel>
                    <Input
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                  
                    <FormLabel>SKU</FormLabel>
                    <Input
                      value={newProductSKU}
                      onChange={(e) => setNewProductSKU(e.target.value)}
                    />
                    
                    <FormLabel>Price</FormLabel>
                    <Input
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                   
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      value={newProductQuantity}
                      onChange={(e) => setNewProductQuantity(e.target.value)}
                    />
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </Stack>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
                  Add
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal> */}
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
                    <FormLabel>Product Name</FormLabel>
                    <Input
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                    <FormLabel>SKU</FormLabel>
                    <Input
                      value={newProductSKU}
                      onChange={(e) => setNewProductSKU(e.target.value)}
                    />
                    <FormLabel>Price</FormLabel>
                    <Input
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                    />
                    <FormLabel>Quantity</FormLabel>
                    <Input
                      value={newProductQuantity}
                      onChange={(e) => setNewProductQuantity(e.target.value)}
                    />

                    <FormLabel>Warehouse</FormLabel>
                    {/* <Input
                      value={newProductWarehosue}
                      onChange={(e) => setNewProductWarehouse(e.target.value)}
                    /> */}
                    <Select
                      value={newProductWarehouse}
                      onChange={(e) => setNewProductWarehouse(e.target.value)}
                    >
                      {warehouses.map((warehouse) => (
                        <option key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </option>
                      ))}
                    </Select>
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
      <style jsx>{`
  .scrollable-container {
    overflow-y: scroll;
    max-height: 500px; /* Set the maximum height as needed */
  }
`}</style>
    </div>
  );
};

export default Products;
