import { HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NavBarLinks() {
  return (
    <HStack spacing={5} ml={8}>
      <Link to="/">
        <Text color="whiteAlpha.900">Race</Text>
      </Link>
      <Link to="/pit-stop">
        <Text color="whiteAlpha.900">Pit stop</Text>
      </Link>
      <Link to="/leaderboard">
        <Text color="whiteAlpha.900">Leaderboard</Text>
      </Link>
    </HStack>
  );
}

export default NavBarLinks;
