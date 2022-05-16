import { HStack, Tag } from "@chakra-ui/react";
import { Quote } from "../utils/types";

interface QuoteTagsProps {
  quote: Quote;
}

function QuoteTags({ quote }: QuoteTagsProps) {
  return (
    <HStack>
      {quote.tags.map((tag, idx) => (
        <Tag key={idx}>{tag}</Tag>
      ))}
    </HStack>
  );
}

export default QuoteTags;
