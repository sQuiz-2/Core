import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Difficulty from 'App/Models/Difficulty';
import DifficultyValidator from 'App/Validators/DifficultyValidator';

export default class DifficultiesController {
  public async index() {
    return Difficulty.all();
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(DifficultyValidator);
    return Difficulty.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(DifficultyValidator);
    const difficulty = await Difficulty.findOrFail(id);
    return difficulty.merge(data).save();
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const difficulty = await Difficulty.findOrFail(id);
    difficulty.delete();
    return difficulty;
  }
}
