import React, { ReactNode } from "react";
import { Button, Link as ChakraLink } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ReactDOM } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  Stack,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText, useEffect } from "react";
import Services from "./services";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import Footer from "./Footer";
import Hero from "./Hero";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Services", icon: FiSettings, href: "services" },
  { name: "About Us", icon: FiTrendingUp, href: "about" },
  { name: "Contact Us", icon: FiCompass, href: "contact" },
];

export default function HomePage({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    AOS.init({ duration: 1100 });
    AOS.refresh();
  }, []);

  const personal = () => {
    const componentContainer = document.getElementById("display");
    ReactDOM.render(<Services />, componentContainer);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* MobileNav */}
      <MobileNav onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        <div>
          <Hero />
        </div>
        <div id="services" data-aos="zoom-in">
          <Services />
        </div>
        <div id="about" data-aos="zoom-in">
          <AboutUs />
        </div>
        <div id="contact" data-aos="zoom-in">
          <ContactUs />
        </div>
        <div>
          <Footer />
        </div>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
          color="teal.500"
        >
          Inventory
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  href: string;
}
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    scrollToSection(href);
  };

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      onClick={handleClick}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <div>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue("white", "gray.900")}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
        justifyContent={{ base: "space-between", md: "flex-end" }}
        {...rest}
      >
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <HStack spacing={{ base: "0", md: "6" }}>
          {/* <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          /> */}  w
          <Flex alignItems={"center"}>
            <Menu>
              <HStack>
                <Stack
                  flex={{ base: 1, md: 0 }}
                  justify={"flex-end"}
                  direction={"row"}
                  spacing={6}
                >
                  <Button
                    as={"a"}
                    display={{ base: "none", md: "inline-flex" }}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.400"}
                    href={"login"}
                    _hover={{
                      bg: "pink.300",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </HStack>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    </div>
  );
};
