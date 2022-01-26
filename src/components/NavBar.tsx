import { Flex, Spacer, Heading, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GiCamelHead } from "react-icons/gi";
import NavBarButtons from "./NavBarButtons";
import NavBarLinks from "./NavBarLinks";

function NavBar() {
  return (
    <Flex bg="blackAlpha.900" alignItems="center">
      <Heading size="lg" p={3} color="white">
        <Link to="/">Camel type</Link>
      </Heading>
      <Icon as={GiCamelHead} color="bisque" width={8} height={8} />
      <NavBarLinks />
      <Spacer />
      <NavBarButtons />
    </Flex>
  );
}

export default NavBar;
