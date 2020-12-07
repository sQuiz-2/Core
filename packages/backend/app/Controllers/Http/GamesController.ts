import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GetGame } from '@squiz/shared';
import Game from 'App/Models/Game';
import FetchGameValidator from 'App/Validators/FetchGameValidator';
import GameValidator from 'App/Validators/GameValidator';

export default class GamesController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 10 } = await request.validate(FetchGameValidator);
    const games: GetGame[] = await Game.query().orderBy('id', 'asc').paginate(page, limit);
    return games;
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(GameValidator);
    return Game.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(GameValidator);
    const game = await Game.findOrFail(id);
    return game.merge(data).save();
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const game = await Game.findOrFail(id);
    game.delete();
    return game;
  }
}
