import { Text } from "@chakra-ui/react";
import { Quote } from "../utils/types";

interface RaceStatsProps {
  isFinished: boolean;
  time: number;
  quote: Quote;
}

function RaceStats({ isFinished, time, quote }: RaceStatsProps) {
  return (
    <>
      <Text>
        <strong>Seconds elapsed: </strong>
        {Math.round(time / 1000)}
      </Text>
      {isFinished && (
        <>
          <Text>
            <strong>WPM: </strong>
            {Math.round(quote.length / 5 / (time / 1000 / 60))}
          </Text>
          <Text>
            <em>By {quote.author}</em>
          </Text>
        </>
      )}
    </>
  );
}

export default RaceStats;
