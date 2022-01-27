import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { ChevronDownIcon, UnlockIcon } from "@chakra-ui/icons";
import { useState, useCallback, useEffect } from "react";
import { User } from "../utils/types";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function NavBarSignIn() {
  const [users, setUsers] = useState<User[]>([]);
  const { currentUser, signIn, signOut } = useAuth();

  const baseApiUrl =
    process.env.REACT_APP_HEAD_API ?? "https://head-type-backend.herokuapp.com";

  const getUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${baseApiUrl}/users`);
      setUsers(res.data.data.users);
    } catch (error) {
      console.log(error);
    }
  }, [baseApiUrl]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <>
      {currentUser === null ? (
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={<ChevronDownIcon />}
            size="sm"
            mr={4}
            colorScheme="green"
            width="100px"
          >
            Sign in
          </MenuButton>
          <MenuList>
            {users.map((user) => (
              <MenuItem onClick={() => signIn(user)} key={user.id}>
                {user.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ) : (
        <Button
          colorScheme="red"
          size="sm"
          mr={4}
          onClick={signOut}
          width="100px"
          leftIcon={<UnlockIcon />}
        >
          Sign out
        </Button>
      )}
    </>
  );
}

export default NavBarSignIn;
