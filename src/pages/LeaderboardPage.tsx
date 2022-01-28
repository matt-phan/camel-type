import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Container,
  Spinner,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useState, useCallback, useEffect } from "react";
import { Race } from "../utils/types";
import axios from "axios";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<Race[]>([]);

  const baseApiUrl =
    process.env.REACT_APP_HEAD_API ?? "https://head-type-backend.herokuapp.com";

  const getLeaderboard = useCallback(async () => {
    const res = await axios.get(`${baseApiUrl}/leaderboard`);
    setLeaderboard(res.data.data.leaderboard);
  }, [baseApiUrl]);

  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <Container mt={5} alignItems="center">
      <VStack>
        {leaderboard.length === 0 ? (
          <Spinner size="xl" mt={39} />
        ) : (
          <>
            <Heading size="lg">{leaderboard[0].user_name} 🏆</Heading>
            <Divider colorScheme="blackAlpha" variant="dashed" />
            <Table variant="simple">
              <TableCaption>Top 10 fastest races of all time</TableCaption>
              <Thead>
                <Tr>
                  <Th>Position</Th>
                  <Th>Name</Th>
                  <Th>WPM</Th>
                </Tr>
              </Thead>
              <Tbody>
                {leaderboard.map((race, idx) => (
                  <Tr>
                    <Td>{idx + 1}</Td>
                    <Td>{race.user_name}</Td>
                    <Td>{race.wpm}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </>
        )}
      </VStack>
    </Container>
  );
}

export default LeaderboardPage;
