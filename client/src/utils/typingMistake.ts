const typingMistake = (currInput: string, currWord: string) => {
  return currInput !== currWord.slice(0, currInput.length);
};

export default typingMistake;
