export interface Quote {
  _id: string;
  tags: string[];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface User {
  id: number;
  name: string;
  created_at: number;
}

export interface NewRace {
  quote_id: string;
  wpm: number;
  accuracy: number;
  milliseconds_elapsed: number;
}

export interface Race extends NewRace {
  id: number;
  user_name: string;
  user_id: number;
  created_at: number;
}
