import {
  Heading,
  Container,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";

function PitStopPage() {
  const { currentUser } = useAuth();
  return (
    <Container mt={5}>
      {currentUser === null ? (
        <VStack>
          <Heading size="lg">Please sign in to view this page!</Heading>
        </VStack>
      ) : (
        <>
          <VStack>
            <Heading size="lg">
              Viewing pit stop for: {currentUser.name}
            </Heading>
            <HStack spacing={10} mt={5}>
              <Stat>
                <StatLabel>Average</StatLabel>
                <StatNumber>345,670</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Best</StatLabel>
                <StatNumber>45</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>No. races</StatLabel>
                <StatNumber>45</StatNumber>
              </Stat>
            </HStack>
          </VStack>
        </>
      )}
    </Container>
  );
}

export default PitStopPage;
