import { VStack, Box, Button, Divider } from "@chakra-ui/react";

interface RacePageGifProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePageGif({ setPlay }: RacePageGifProps) {
  return (
    <VStack spacing={5}>
      <Box>
        <iframe
          src="https://giphy.com/embed/13j7rnoKJUWt8c"
          width="480"
          height="270"
          frameBorder="0"
          className="giphy-embed"
          title="camel"
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
