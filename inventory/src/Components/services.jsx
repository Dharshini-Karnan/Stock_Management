import React from "react";
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
} from "@chakra-ui/react";

const ServiceBox = ({ title, description, image }) => (
  <Box
    role={"group"}
    p={6}
    maxW={"330px"}
    w={"full"}
    // bg={useColorModeValue("white", "gray.800")}
    boxShadow={"2xl"}
    rounded={"lg"}
    pos={"relative"}
    zIndex={1}
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
        color={"blackAlpha.600"}
      >
        {description}
      </Heading>
    </Stack>
  </Box>
);

const Services = () => {
  const services = [
    {
      title: "Order Management",
      // description: "It's all about orders!",
      image:
        "https://res.cloudinary.com/dyizhabab/image/upload/v1690360957/Inventory/nn3rwghh6qvoiofjedth.webp",
    },
    {
      title: "Stock Management",
      // description: "It's all about stocks!",
      image:
        "https://res.cloudinary.com/dyizhabab/image/upload/v1690361177/Inventory/vnkkdfdgxpqncxukplve.jpg",
    },
    {
      title: "Warehouse Management",
      // description: "It's all about warehouses!",
      image:
        "https://res.cloudinary.com/dyizhabab/image/upload/v1690361071/Inventory/r9ard5k7fhxpowbgdcgs.jpg",
    },
    {
      title: "Inventory Management",
      // description: "It's all about inventories!",
      image:
        "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div>
      {/* <h1>Our Services</h1> */}
      <Heading
        fontSize={{ base: "2xl", sm: "4xl" }}
        fontWeight={"bold"}
        color={"blackAlpha.900"}
        fontStyle={"italic"}
      >
        Our Services
      </Heading>
      <Center py={12}>
        <Wrap spacing={12} justify="center">
          <WrapItem>
            <ServiceBox
              title={services[0].title}
              description={services[0].description}
              image={services[0].image}
            />
          </WrapItem>
          <WrapItem>
            <ServiceBox
              title={services[1].title}
              description={services[1].description}
              image={services[1].image}
            />
          </WrapItem>
        </Wrap>
        <Wrap spacing={12} justify="center" mt={7}>
          <WrapItem>
            <ServiceBox
              title={services[2].title}
              description={services[2].description}
              image={services[2].image}
            />
          </WrapItem>
          <WrapItem>
            <ServiceBox
              title={services[3].title}
              description={services[3].description}
              image={services[3].image}
            />
          </WrapItem>
        </Wrap>
      </Center>
    </div>
  );
};

export default Services;
