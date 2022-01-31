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
import { useAuth } from "../contexts/AuthContext";
import QuoteTags from "./QuoteTags";
import RaceStats from "./RaceStats";
import RaceButtons from "./RaceButtons";
import QuoteWord from "./QuoteWord";

interface RacePagePlayProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePagePlay({ setPlay }: RacePagePlayProps) {
  const [quote, setQuote] = useState<Quote>();
  const [currInput, setCurrInput] = useState<string>("");
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const { time, handleStart, handlePause, handleReset } = useStopwatch();
  const { currentUser } = useAuth();
  const toast = useToast();

  const baseQuoteUrl =
    process.env.REACT_APP_QUOTE_API ?? "https://api.quotable.io";

  const baseApiUrl =
    process.env.REACT_APP_HEAD_API ?? "https://head-type-backend.herokuapp.com";

  const getQuote = useCallback(async () => {
    try {
      const res = await axios.get(`${baseQuoteUrl}/random`, {
        params: { maxLength: 100, minLength: 50 },
      });
      setQuote(res.data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    }
  }, [baseQuoteUrl]);

  useEffect(() => {
    getQuote();
  }, [getQuote]);

  const quoteWords = quote ? quote.content.split(" ") : [];

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    // determine when the first key press is to start timer
    if (e.target.value.length === 1 && currWordIndex === 0) {
      handleStart();
    }

    // handle typing and clearing of the input
    if (e.target.value === quoteWords[currWordIndex] + " ") {
      setCurrInput("");
      setCurrWordIndex((prevIdx) => prevIdx + 1);
    } else {
      setCurrInput(e.target.value);
    }

    // finish condition
    handleFinish(e);
  };

  const handleFinish = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      currWordIndex === quoteWords.length - 1 &&
      e.target.value === quoteWords[currWordIndex]
    ) {
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
    setCurrWordIndex(0);
  };

  return (
    <VStack spacing={2}>
      {!quote ? (
        <Spinner size="xl" mt={39} />
      ) : (
        <>
          <QuoteTags quote={quote} />
          <Box borderWidth={1} borderColor="blackAlpha.200" borderRadius={8}>
            <Text p={4}>
              {quoteWords.map((word, wordIdx) => (
                <QuoteWord
                  word={word}
                  wordIdx={wordIdx}
                  currWordIdx={currWordIndex}
                  currInput={currInput}
                  quoteWords={quoteWords}
                  isFinished={isFinished}
                />
              ))}
            </Text>
          </Box>
          <Input
            value={currInput}
            onChange={handleTyping}
            isDisabled={isFinished}
            autoFocus
          ></Input>
          <RaceButtons
            setPlay={setPlay}
            handleLoadNextRace={handleLoadNextRace}
          />
          <RaceStats isFinished={isFinished} time={time} quote={quote} />
        </>
      )}
    </VStack>
  );
}

export default RacePagePlay;

/*
Plan for refactoring the typing algorithm:
1) Use onChange only
2) Use util functions to determine when a space has been pressed using the value, onChange double binding
3) For now, just detect when the word is correct, click space to clear the input and move on to the next word
*/
