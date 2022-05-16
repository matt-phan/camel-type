export class NewRaceDto {
  quote_id: string;
  wpm: number;
  accuracy: number;
  milliseconds_elapsed: number;
}

export class RaceDto extends NewRaceDto {
  id: number;
  user_id: number;
  created_at: string;
}
