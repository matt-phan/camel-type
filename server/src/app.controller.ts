import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewRaceDto } from './dto/race.dto';
import { UserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  async getUsers() {
    return await this.appService.getUsers();
  }

  @Get('/users/:id/races')
  async getUserRacesById(@Param('id') id: number) {
    return await this.appService.getUserRacesById(id);
  }

  @Post('/users/:id/races')
  async postUserRace(@Param('id') id: number, @Body() newRaceDto: NewRaceDto) {
    return await this.appService.postUserRace(id, newRaceDto);
  }

  @Get('/leaderboard')
  async getLeaderboard() {
    return await this.appService.getLeaderboard();
  }

  @Get('users/:id/stats')
  async getUserStatsById(@Param('id') id: number) {
    return await this.appService.getUserStatsById(id);
  }
}
