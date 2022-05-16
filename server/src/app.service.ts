import { Injectable } from '@nestjs/common';
import { Client, QueryResult } from 'pg';
import { UserDto } from './dto/user.dto';
import { NewRaceDto, RaceDto } from './dto/race.dto';

@Injectable()
export class AppService {
  constructor(private client: Client) {
    this.client.connect();
  }

  async getUsers() {
    const res: QueryResult<UserDto> = await this.client.query(
      'SELECT * FROM users',
    );

    return {
      status: 'success',
      message: 'retrived all users',
      data: { users: res.rows },
    };
  }

  async getUserRacesById(id: number) {
    const res: QueryResult<RaceDto[]> = await this.client.query(
      'SELECT * FROM races WHERE user_id = $1 ORDER BY created_at DESC',
      [id],
    );

    return {
      status: 'success',
      message: 'retrieved all races for a specific user',
      data: { races: res.rows },
    };
  }

  async postUserRace(id: number, newRaceDto: NewRaceDto) {
    const { quote_id, wpm, accuracy, milliseconds_elapsed } = newRaceDto;

    const res: QueryResult<NewRaceDto> = await this.client.query(
      'INSERT INTO races (user_id, quote_id, wpm, accuracy, milliseconds_elapsed)\
     VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id, quote_id, wpm, accuracy, milliseconds_elapsed],
    );

    return {
      status: 'success',
      message: 'posted a new race for a specific user',
      data: { new_race: res.rows[0] },
    };
  }

  async getLeaderboard() {
    const res: QueryResult<RaceDto> = await this.client.query(
      'SELECT r.*, u.name user_name FROM races r JOIN users u \
      ON u.id = r.user_id ORDER BY wpm DESC LIMIT 10;',
    );
    return {
      status: 'success',
      message: 'retrived all time leaderboard of top 10 races',
      data: { leaderboard: res.rows },
    };
  }

  async getUserStatsById(id: number) {
    const resAllTimeAvg = await this.client.query(
      'SELECT AVG(wpm) FROM races WHERE user_id = $1;',
      [id],
    );

    const resBest = await this.client.query(
      'SELECT wpm FROM races WHERE user_id = $1 ORDER BY wpm DESC LIMIT 1',
      [id],
    );

    const resNoRaces = await this.client.query(
      'SELECT COUNT(*) FROM races WHERE user_id = $1',
      [id],
    );

    return {
      status: 'success',
      message: 'retrieved stats for a specific user',
      data: {
        average: resAllTimeAvg.rows[0].avg,
        best: resBest.rows[0].wpm,
        no_races: resNoRaces.rows[0].count,
      },
    };
  }
}
