import { Container } from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import RacePageGif from "../components/RacePageGif";
import RacePagePlay from "../components/RacePagePlay";

function RacePage() {
  const [quote, setQuote] = useState<any>();
  // const [gif, setGif] = useState<any>();
  const [play, setPlay] = useState<boolean>(false);

  const baseQuoteUrl =
    process.env.REACT_APP_QUOTE_API ?? "https://api.quotable.io";

  // const baseGifUrl = process.env.REACT_APP_GIF_API ?? "https://g.tenor.com/v1";
  // const gifApiKey = process.env.REACT_APP_GIF_API_KEY ?? "21MY2QDI5T58";

  const getQuote = useCallback(async () => {
    try {
      const res = await axios.get(`${baseQuoteUrl}/random`, {
        params: { maxLength: 400, minLength: 100 },
      });
      console.log(res.data);
      setQuote(res.data);
    } catch (error) {
      console.log(`something went wrong: ${error}`);
    }
  }, [baseQuoteUrl]);

  // const getGif = useCallback(async () => {
  //   try {
  //     const res = await axios.get(`${baseGifUrl}/search`, {
  //       params: { key: gifApiKey, q: "typing", limit: 1 },
  //     });
  //     console.log("gif object: ", res.data.results[0]);
  //     console.log("url: ", res.data.results[0].url);
  //     setGif(res.data.results[0]);
  //   } catch (error) {
  //     console.log(`something went wrong: ${error}`);
  //   }
  // }, [baseGifUrl, gifApiKey]);

  useEffect(() => {
    getQuote();
    // getGif();
  }, [getQuote /*getGif*/]);
  return (
    <Container mt={5} alignItems="center">
      {play ? (
        <RacePagePlay setPlay={setPlay} />
      ) : (
        <RacePageGif setPlay={setPlay} />
      )}
      {JSON.stringify(quote)}
    </Container>
  );
}

export default RacePage;
