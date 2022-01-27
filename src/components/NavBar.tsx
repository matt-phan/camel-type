import { Flex, Icon, Spacer } from "@chakra-ui/react";
import { GiCamelHead } from "react-icons/gi";
import NavBarSignIn from "./NavBarSignIn";
import NavBarHamburger from "./NavBarHamburger";
import { useAuth } from "../contexts/AuthContext";
import "../styles/NavBar.css";

function NavBar() {
  const { currentUser } = useAuth();
  return (
    <Flex bg="blackAlpha.900" alignItems="center">
      <NavBarHamburger />
      <Spacer />
      <strong>
        <h1 className="heading">Camel type</h1>
      </strong>
      <Icon as={GiCamelHead} color="white" width={8} height={8} ml={5} />
      <Spacer />
      <NavBarSignIn />
    </Flex>
  );
}

export default NavBar;
