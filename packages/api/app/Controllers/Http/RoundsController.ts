import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Round from 'App/Models/Round';
import RoundValidator from 'App/Validators/RoundValidator';

export default class RoundsController {
  public async index() {
    return Round.query().where('validated', true).preload('answers');
  }

  public async store({ request }: HttpContextContract) {
    const { answers, ...RoundData } = await request.validate(RoundValidator);
    const round = await Round.create({
      ...RoundData,
      validated: false,
    });
    const createdAnswers = await round.related('answers').createMany(answers);
    return { round, createdAnswers };
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params;
    const data = await request.validate(RoundValidator);
    const { answers } = request.only(['answers']);
    const round = await Round.findOrFail(id);
    await round.related('answers').query().delete();
    const createdAnswers = await round.related('answers').createMany(answers);
    round.merge(data);
    round.save();
    return { round, createdAnswers };
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const round = await Round.findOrFail(id);
    round.delete();
    return round;
  }

  public async random({ request }: HttpContextContract) {
    const { difficulties = [] }: { difficulties: number[] } = request.only(['difficulties']);

    if (!difficulties) return [];
    const rounds = await Round.query()
      .where('validated', true)
      .whereIn('difficulty_id', difficulties)
      .preload('answers');
    const selectRounds: Round[] = [];
    for (let i = 0; i < 100 && rounds.length > 0; i++) {
      const rand = Math.floor(Math.random() * rounds.length);
      selectRounds.push(rounds[rand]);
      rounds.splice(rand, 1);
    }
    return selectRounds;
  }
}
