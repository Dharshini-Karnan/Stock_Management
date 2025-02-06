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
  useColorMode,
  Spinner,
} from "@chakra-ui/react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ServiceBox = ({ title, description, image, onDelete }) => {
  const handleImageClick = () => {
    window.location.href = "/warehouse";
  };

  return (
    <Box
      role={"group"}
      p={6}
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"lg"}
      pos={"relative"}
      zIndex={1}
      cursor="pointer"
      onClick={handleImageClick}
    >
      <Box
        rounded={"lg"}
        mt={-12}
        pos={"relative"}
        height={"230px"}
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded={"lg"}
          height={230}
          width={282}
          objectFit={"cover"}
          src={image}
        />
      </Box>
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
};

const Stocks = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      setProducts([
        {
          title: "WareHouse 1",
          image:
            "https://res.cloudinary.com/dyizhabab/image/upload/v1689223906/Inventory/g8bjlkvmso748xp3ylbl.jpg",
        },
        {
          title: "WareHouse 2",
          image:
            "https://res.cloudinary.com/dyizhabab/image/upload/v1689266283/Inventory/uvng2s8khyejsugab6lg.jpg",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    // width: "10%",
  };
  const { colorMode } = useColorMode();
  return (
    <div>
      {isLoading ? (
        <Center h="100vh">
          <Spinner size="lg" color="teal.500" />
        </Center>
      ) : (
        <>
          <NavBar />
          <div className="container">
            <Center py={12} {...containerStyles}>
              <Wrap spacing={12} justify="center">
                {products.map((product, index) => (
                  <WrapItem key={index}>
                    <ServiceBox
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      // onDelete={() => handleDeleteProduct(index)}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Center>
          </div>
        </>
      )}
      <Footer />
      <style jsx>{`
        .container {
          background: ${colorMode === "light"
            ? "#0c0810"
            : "linear-gradient(to right, #0f2027, #203a43, #2c5364)"};
        }
      `}</style>
    </div>
  );
};

export default Stocks;
