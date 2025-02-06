import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        {/* <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button> */}
      </Stack>
    </Box>
  );
};

export default function AboutUs() {
  return (
    <Box p={4} color={"teal"}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading
          fontSize={{ base: "2xl", sm: "4xl" }}
          fontWeight={"bold"}
          color={"blackAlpha.900"}
          fontStyle={"italic"}
        >
          About Us
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
          
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center" color={"blue"}>
          <Card
            heading={
              <Heading color="gray.500" fontSize="xl">
                Customer Support
              </Heading>
            }
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              <Text color="blackAlpha.600">
                Well skilled and supportive customer care support for 24/7.
              </Text>
            }
          />
          <Card
            heading={
              <Heading color="gray.500" fontSize="xl">
                Supplier Collaboration
              </Heading>
            }
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              <Text color="blackAlpha.600">
                Facilitate communication and collaboration with suppliers for better stock control.
              </Text>
            }
          //  href={"#"}
          />
          <Card
            heading={
              <Heading color="gray.500" fontSize="xl">
                Donate
              </Heading>
            }
            icon={<Icon as={FcDonate} w={10} h={10} />}
            description={
              <Text color="blackAlpha.600">
               Empower change with your support; together, we make a difference.
              </Text>
            }
            // href={"#"}
          />
          <Card
            heading={
              <Heading color="gray.500" fontSize="xl">
                User-Friendly Interface
              </Heading>
            }
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              <Text color="blackAlpha.600">
                 Intuitive design for easy navigation and quick task completion.
              </Text>
            } 
          />
          <Card
            heading={
              <Heading color="gray.500" fontSize="xl">
                Customizable Reporting
              </Heading>
            }
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              <Text color="blackAlpha.600">
                Access detailed reports for insights into stock performance and trends.
              </Text>
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
