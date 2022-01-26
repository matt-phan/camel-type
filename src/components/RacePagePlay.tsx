import {
  VStack,
  Button,
  Box,
  Text,
  Input,
  Tag,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface RacePagePlayProps {
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}

function RacePagePlay({ setPlay }: RacePagePlayProps) {
  const [quote, setQuote] = useState<any>(undefined);
  const baseQuoteUrl =
    process.env.REACT_APP_QUOTE_API ?? "https://api.quotable.io";

  const getQuote = useCallback(async () => {
    try {
      const res = await axios.get(`${baseQuoteUrl}/random`, {
        params: { maxLength: 400, minLength: 150 },
      });
      console.log(res.data);
      setQuote(res.data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    }
  }, [baseQuoteUrl]);

  useEffect(() => {
    console.log("mounted!");
    getQuote();
    return () => console.log("unmounted!");
  }, [getQuote]);

  return (
    <VStack spacing={2}>
      {!quote ? (
        <Spinner size="xl" />
      ) : (
        <>
          <p>{JSON.stringify(quote)}</p> {/*development purposes*/}
          <HStack>
            {quote.tags.map((tag: string) => (
              <Tag key={quote._id}>{tag}</Tag>
            ))}
          </HStack>
          <Box borderWidth={1} borderColor="blackAlpha.200" borderRadius={8}>
            <Text p={4}>{quote.content}</Text>
          </Box>
          <Input></Input>
          <Button onClick={() => setPlay(false)} colorScheme="red">
            Back
          </Button>
        </>
      )}
    </VStack>
  );
}

export default RacePagePlay;
