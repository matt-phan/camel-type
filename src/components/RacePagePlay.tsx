import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import {
  VStack,
  Button,
  Box,
  Text,
  Input,
  Tag,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { Quote } from "../utils/types";
import useStopwatch from "../utils/useStopwatch";

interface RacePagePlayProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePagePlay({ setPlay }: RacePagePlayProps) {
  const [quote, setQuote] = useState<Quote>();
  const [quoteWords, setQuoteWords] = useState<string[]>([]);
  const [currInput, setCurrInput] = useState<string>("");
  const [currCharIndex, setCurrCharIndex] = useState<number>(0);
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [isFirstKeyPress, setIsFirstKeyPress] = useState<boolean>(true);
  const { time, handleStart, handlePause, handleReset } = useStopwatch();
  const toast = useToast();

  const baseQuoteUrl =
    process.env.REACT_APP_QUOTE_API ?? "https://api.quotable.io";

  const getQuote = useCallback(async () => {
    try {
      const res = await axios.get(`${baseQuoteUrl}/random`, {
        params: { maxLength: 100, minLength: 25 },
      });
      console.log(res.data);
      setQuote(res.data);
      setQuoteWords(res.data.content.split(" "));
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    }
  }, [baseQuoteUrl]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // start the stop watch if its the first key press
    if (isFirstKeyPress) {
      handleStart();
      setIsFirstKeyPress(false);
    }

    // change certain states based on certain key presses
    if (event.key === "Shift") {
      // do nothing
    } else if (event.key === "Backspace") {
      currCharIndex > 0 && setCurrCharIndex((prevIdx) => prevIdx - 1); // ensure character index can't go negative
    } else if (event.key === " ") {
      if (doesWordMatch()) {
        setCurrInput("");
        currWordIndex < quoteWords.length - 1 && // ensure word index can't be above total number of words - 1
          setCurrWordIndex((prevIdx) => prevIdx + 1);
        setCurrCharIndex(0);
      }
    } else {
      setCurrCharIndex((prevIdx) => prevIdx + 1);
    }

    handleFinish(event.key);
  };

  const doesCharMatch = (key: string) => {
    return (
      currCharIndex < quoteWords[currWordIndex].length &&
      quoteWords[currWordIndex][currCharIndex] === key
    );
  };

  const doesWordMatch = () => {
    return currInput === quoteWords[currWordIndex];
  };

  const handleFinish = (key: string) => {
    if (
      currWordIndex === quoteWords.length - 1 &&
      currCharIndex === quoteWords[currWordIndex].length - 1 &&
      doesCharMatch(key)
    ) {
      toast({
        title: "Finished! Click refresh to race again!",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsFinished(true);
      handlePause();
    }
  };

  const handleLoadNextRace = () => {
    setQuote(undefined);
    getQuote();
    handleReset();
    setIsFinished(false);
    setCurrInput("");
    setCurrCharIndex(0);
    setCurrWordIndex(0);
    setIsFirstKeyPress(true);
  };

  return (
    <VStack spacing={2}>
      {!quote ? (
        <Spinner size="xl" mt={39} />
      ) : (
        <>
          <p>
            <strong>quote:</strong> {JSON.stringify(quote)}
          </p>
          {/*development purposes*/}
          <p>
            <strong>quote content split:</strong>
            {JSON.stringify(quoteWords)}
          </p>
          {/*development purposes*/}
          <HStack>
            {quote.tags.map((tag, idx) => (
              <Tag key={idx}>{tag}</Tag>
            ))}
          </HStack>
          <Box borderWidth={1} borderColor="blackAlpha.200" borderRadius={8}>
            <Text p={4}>
              {quote.content.split("").map((char) => (
                <span>{char}</span>
              ))}
            </Text>
          </Box>
          <Input
            onKeyDown={handleKeyDown}
            value={currInput}
            onChange={(e) => setCurrInput(e.target.value.trim())}
            isDisabled={isFinished}
          ></Input>
          <HStack>
            <Button onClick={() => setPlay(false)} colorScheme="red">
              Back
            </Button>
            {isFinished && (
              <Button colorScheme="green" onClick={handleLoadNextRace}>
                Next Race
              </Button>
            )}
          </HStack>
          <Text>
            <strong>WPM: </strong>
            {!isFinished
              ? "pending..."
              : Math.round(quote.length / 5 / (time / 1000 / 60))}
          </Text>
          <Text>
            <strong>Seconds elapsed: </strong>
            {Math.round(time / 1000)}
          </Text>
        </>
      )}
    </VStack>
  );
}

export default RacePagePlay;
