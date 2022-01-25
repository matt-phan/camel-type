import { Flex, Spacer, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FaHorseHead } from "react-icons/fa";

function NavBar() {
  return (
    <>
      <Flex bg="blackAlpha.900" alignItems="center">
        <Heading p={3} color="whiteAlpha.900">
          Head type
        </Heading>
        <Icon as={FaHorseHead} color="whiteAlpha.900" width={10} height={10} />
      </Flex>
    </>
  );
}

export default NavBar;
