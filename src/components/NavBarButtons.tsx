import { useToast, Button } from "@chakra-ui/react";

function NavBarButtons() {
  const toast = useToast();
  return (
    <>
      <Button
        mr={3}
        colorScheme="orange"
        size="sm"
        onClick={() =>
          toast({
            title: "We can't sign you up just yet!",
            description: "",
            status: "info",
            duration: 3000,
            isClosable: true,
          })
        }
      >
        Sign up
      </Button>
      <Button
        mr={3}
        colorScheme="green"
        size="sm"
        onClick={() =>
          toast({
            title: "We can't sign you in just yet!",
            description: "",
            status: "info",
            duration: 3000,
            isClosable: true,
          })
        }
      >
        Sign in
      </Button>
    </>
  );
}

export default NavBarButtons;
