import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GetDifficultyFromName } from '@squiz/shared';
import RoomPool from 'App/Class/RoomPool';
import { randomString } from 'App/Utils/Random';
import CreateRoomValidator from 'App/Validators/CreateRoomValidator';

export default class GamesController {
  public async create(ctx: HttpContextContract) {
    const roomConfig = await ctx.request.validate(CreateRoomValidator);
    const randomPrivateTitle = randomString(4);
    const roomId = RoomPool.addRoom({
      difficulty: GetDifficultyFromName(roomConfig.selectedDifficulty),
      antiCheat: roomConfig.antiCheat,
      maxPlayers: roomConfig.players,
      private: true,
      title: randomPrivateTitle,
      timeToAnswer: roomConfig.timeToAnswer,
      timeBetweenQuestion: roomConfig.timeBetweenQuestion,
      timeBetweenGames: roomConfig.timeBetweenGames,
      selectedThemes: roomConfig.selectedThemes,
      rounds: roomConfig.rounds,
      startGameManually: roomConfig.startGameManually,
      startRoundManually: roomConfig.startRoundManually,
      adminDbId: ctx.auth.user!.id,
    });
    return {
      roomId,
      privateCode: randomPrivateTitle,
    };
  }

  public async join(ctx: HttpContextContract) {
    const { code } = ctx.params;
    const privateRoomId = RoomPool.getRoomIdWithCode(code);
    return privateRoomId;
  }
}
