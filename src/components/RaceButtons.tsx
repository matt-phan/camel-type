import { HStack, Button } from "@chakra-ui/react";

interface RaceButtonsProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  handleLoadNextRace: () => void;
}

function RaceButtons({ setPlay, handleLoadNextRace }: RaceButtonsProps) {
  return (
    <HStack>
      <Button onClick={() => setPlay(false)} colorScheme="red">
        Back
      </Button>
      <Button colorScheme="green" onClick={handleLoadNextRace}>
        New Race
      </Button>
    </HStack>
  );
}

export default RaceButtons;
