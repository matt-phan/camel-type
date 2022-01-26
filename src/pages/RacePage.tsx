import { Container } from "@chakra-ui/react";
import { useState } from "react";
import RacePageGif from "../components/RacePageGif";
import RacePagePlay from "../components/RacePagePlay";

function RacePage() {
  const [play, setPlay] = useState<boolean>(false);

  return (
    <Container mt={5} alignItems="center">
      {play ? (
        <RacePagePlay setPlay={setPlay} />
      ) : (
        <RacePageGif setPlay={setPlay} />
      )}
    </Container>
  );
}

export default RacePage;
