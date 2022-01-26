import { VStack, Box, Button, Divider } from "@chakra-ui/react";

interface RacePageGifProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePageGif({ setPlay }: RacePageGifProps) {
  return (
    <VStack spacing={5}>
      <Box>
        <iframe
          src="https://giphy.com/embed/13GIgrGdslD9oQ"
          title="typing"
          width="480"
          height="288"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </Box>
      <Button colorScheme="green" onClick={() => setPlay(true)}>
        Race!
      </Button>
      <Divider />
    </VStack>
  );
}

export default RacePageGif;
