import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Round from 'App/Models/Round';
import RoundValidator from 'App/Validators/RoundValidator';
import RoundsValidator from 'App/Validators/RoundsValidator';

export default class RoundsController {
  public async index() {
    return Round.query().where('validated', true).preload('answers').preload('theme');
  }

  public async store({ request }: HttpContextContract) {
    const { answers, ...roundData } = await request.validate(RoundValidator);
    const round = await Round.create({
      ...roundData,
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

  public async storeLot({ request }: HttpContextContract) {
    const { rounds } = await request.validate(RoundsValidator);

    for (const { answers, ...roundData } of rounds) {
      const round = await Round.create({
        ...roundData,
        validated: true,
      });
      await round.related('answers').createMany(answers);
    }
  }
}
