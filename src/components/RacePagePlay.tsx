import { VStack, Button } from "@chakra-ui/react";

interface RacePagePlayProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePagePlay({ setPlay }: RacePagePlayProps) {
  return (
    <VStack>
      <p>play</p>
      <Button onClick={() => setPlay(false)}>Back</Button>
    </VStack>
  );
}

export default RacePagePlay;
