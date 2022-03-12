import typingMistake from "../utils/typingMistake";

interface QuoteWordProps {
  word: string;
  wordIdx: number;
  currWordIdx: number;
  currInput: string;
  quoteWords: string[];
  isFinished: boolean;
}

function QuoteWord({
  word,
  wordIdx,
  currWordIdx,
  currInput,
  quoteWords,
  isFinished,
}: QuoteWordProps) {
  const isCurrentWord = wordIdx === currWordIdx;

  const isCompleted = currWordIdx > wordIdx;

  const prevWordColour = isCompleted ? "green" : "black";

  const currWordStyle = () => {
    if (typingMistake(currInput, quoteWords[currWordIdx])) {
      return {
        backgroundColor: "#ffe6e6",
        color: "red",
      };
    } else {
      return {
        backgroundColor: "#E8E8E8",
        color: "black",
      };
    }
  };

  return (
    <>
      <span key={wordIdx} style={{ color: prevWordColour }}>
        {isCurrentWord ? (
          !isFinished ? (
            <mark style={currWordStyle()}>{word}</mark>
          ) : (
            <span style={{ color: "green" }}>{word}</span>
          )
        ) : (
          word
        )}
      </span>
      {wordIdx !== quoteWords.length - 1 && (
        <span key={`${wordIdx}-space`}> </span>
      )}
    </>
  );
}

export default QuoteWord;
