import { Flex, Spacer, Heading, Text, Icon, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHorseHead } from "react-icons/fa";
import NavBarButtons from "./NavBarButtons";
import NavBarLinks from "./NavBarLinks";

function NavBar() {
  return (
    <Flex bg="blackAlpha.900" alignItems="center">
      <Heading p={3} color="whiteAlpha.900">
        <Link to="/">Head type</Link>
      </Heading>
      <Icon as={FaHorseHead} color="whiteAlpha.900" width={8} height={8} />
      <NavBarLinks />
      <Spacer />
      <NavBarButtons />
    </Flex>
  );
}

export default NavBar;
