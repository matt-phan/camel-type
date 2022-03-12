import {
  Heading,
  Container,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Stats, Race } from "../utils/types";
import {
  timestampConverter,
  // timestampConverterToGB,
} from "../utils/timestampConverter";

function PitStopPage() {
  const [stats, setStats] = useState<Stats>();
  const [raceHistory, setRaceHistory] = useState<Race[]>([]);
  const { currentUser } = useAuth();

  const baseApiUrl =
    process.env.REACT_APP_HEAD_API ?? "https://head-type-backend.herokuapp.com";

  const getStats = useCallback(async () => {
    if (currentUser) {
      const res = await axios.get(
        `${baseApiUrl}/users/${currentUser.id}/stats`
      );
      setStats(res.data.data);
    }
  }, [baseApiUrl, currentUser]);

  const getRaceHistory = useCallback(async () => {
    if (currentUser) {
      const res = await axios.get(
        `${baseApiUrl}/users/${currentUser.id}/races`
      );
      setRaceHistory(res.data.data.races); // should be races not users once the backend is pushed
    }
  }, [baseApiUrl, currentUser]);

  useEffect(() => {
    getStats();
    getRaceHistory();
  }, [getStats, getRaceHistory]);

  return (
    <Container mt={5}>
      {currentUser === null ? (
        <VStack>
          <Heading size="lg">Please sign in to view this page!</Heading>
          <iframe
            src="https://giphy.com/embed/3q18tyzU5GBUs"
            width="480"
            height="289"
            frameBorder="0"
            className="giphy-embed"
            title="camel drinking water"
            allowFullScreen
          ></iframe>
        </VStack>
      ) : (
        <>
          <VStack>
            <Heading size="lg">{currentUser.name}</Heading>
            <iframe
              src="https://giphy.com/embed/3q18tyzU5GBUs"
              width="480"
              height="289"
              frameBorder="0"
              className="giphy-embed"
              title="camel drinking water"
              allowFullScreen
            ></iframe>
            <HStack spacing={10} mt={5}>
              <Stat>
                <StatLabel>Average</StatLabel>
                <StatNumber>
                  {!stats ? <Spinner size="xs" /> : Math.round(stats.average)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Best</StatLabel>
                <StatNumber>
                  {!stats ? <Spinner size="xs" /> : stats.best}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>No. races</StatLabel>
                <StatNumber>
                  {!stats ? <Spinner size="xs" /> : stats.no_races}
                </StatNumber>
              </Stat>
            </HStack>
            {raceHistory.length === 0 ? (
              <Spinner size="xl" mt={39} />
            ) : (
              <Center>
                <Table variant="simple">
                  <TableCaption>{currentUser.name}'s race history</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>No.</Th>
                      <Th>WPM</Th>
                      <Th>When</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {raceHistory.map((race, idx) => (
                      <Tr>
                        <Td>{raceHistory.length - idx}</Td>
                        <Td>{race.wpm}</Td>
                        <Td>{timestampConverter(race.created_at)}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Center>
            )}
          </VStack>
        </>
      )}
    </Container>
  );
}

export default PitStopPage;
