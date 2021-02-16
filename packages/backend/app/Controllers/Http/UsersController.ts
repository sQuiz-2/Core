import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GetUsers, MeBasic } from '@squiz/shared';
import GameStat from 'App/Models/GameStat';
import RoundStat from 'App/Models/RoundStat';
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';

export default class UsersController {
  public async index() {
    const getUsers: GetUsers = await User.query().select('id', 'email');
    return getUsers;
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;
    const user = await User.findOrFail(id);
    return { id: user.id, email: user.email };
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(UserValidator);
    const user = await User.create(data);
    return { id: user.id, email: user.email };
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(UserValidator);
    const user = await User.findOrFail(id);
    user.merge(data);
    await user.save();
    return { id: user.id, email: user.email };
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const user = await User.findOrFail(id);
    return user.delete();
  }

  public async meBasic({ auth }: HttpContextContract) {
    if (!auth.user) return;
    const gameStats = await GameStat.query().where('user_id', auth.user.id);
    const roundStats = await RoundStat.query().where('user_id', auth.user.id);
    const meBasic: MeBasic = {
      experience: auth.user?.experience,
      gameStats,
      roundStats,
    };
    return meBasic;
  }
}
