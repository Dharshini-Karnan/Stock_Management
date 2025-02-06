import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const StockPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchData = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(fetchData);
  }, []);

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  };

  const lightModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "2px 2px 2px rgba(51, 153, 153, 0.5)",
    borderRadius: "20px",
    width: "700px",
    height: "500px",
    padding: "50px",
    background: "rgba(255, 255, 255, 0.8)",
  };

  const darkModeTableContainerStyles = {
    border: "1px solid #ccc",
    boxShadow: "2px 2px 2px rgba(51, 153, 153, 0.5)",
    borderRadius: "20px",
    width: "700px",
    height: "500px",
    padding: "50px",
    background: "rgba(0, 0, 0, 0.8)",
  };

  const tableContainerStyles =
    colorMode === "light"
      ? lightModeTableContainerStyles
      : darkModeTableContainerStyles;

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
          <Box style={containerStyles}>
            <TableContainer
              className="tableContainer"
              style={{ ...tableContainerStyles, height: "auto" }}
            >
              <Table variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>S.No</Th>
                    <Th>Product</Th>
                    <Th>Capacity</Th>
                    <Th>Warehouse</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>1</Td>
                    <Td>Luck</Td>
                    <Td isNumeric>1/4(kg)</Td>
                    <Td>Ladoo</Td>
                    <Td>3500</Td>
                  </Tr>
                  <Tr>
                    <Td>2</Td>
                    <Td>Life</Td>
                    <Td isNumeric>1/4(kg)</Td>
                    <Td>SundarKi</Td>
                    <Td>3500</Td>
                  </Tr>
                  <Tr>
                    <Td>3</Td>
                    <Td>Labour</Td>
                    <Td isNumeric>1/4(kg)</Td>
                    <Td>Sanjeevi</Td>
                    <Td>3500</Td>
                  </Tr>
                  <Tr>
                    <Td>4</Td>
                    <Td>Talent</Td>
                    <Td isNumeric>1/4(kg)</Td>
                    <Td>Sanjeevi</Td>
                    <Td>3500</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Center>
      </div>
      <Footer />
      <style jsx>{`
        .container {
          background: ${colorMode === "light"
            ? "linear-gradient(to right, #44A08D, #093637)"
            : "linear-gradient(to right, #805AD5, #E53E3E)"};
        }

        .tableContainer {
          background: ${colorMode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(0, 0, 0, 0.8)"};
        }
      `}</style>
    </div>
  );
};

export default StockPage;
