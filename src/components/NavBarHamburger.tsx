import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { GiCamel, GiWaterDrop } from "react-icons/gi";
import { MdLeaderboard } from "react-icons/md";

function NavBarHamburger() {
  const navigate = useNavigate();
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          mx={5}
          colorScheme="white"
          height={8}
        />
        <MenuList>
          <MenuItem icon={<GiCamel />} onClick={() => navigate("/")}>
            Race
          </MenuItem>
          <MenuItem
            icon={<GiWaterDrop />}
            onClick={() => navigate("/pit-stop")}
          >
            Pit stop
          </MenuItem>
          <MenuItem
            icon={<MdLeaderboard />}
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default NavBarHamburger;
