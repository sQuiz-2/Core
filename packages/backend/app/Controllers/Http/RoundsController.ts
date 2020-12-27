import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GetRound } from '@squiz/shared';
import Round from 'App/Models/Round';
import FetchRoundValidator from 'App/Validators/FetchRoundValidator';
import RoundValidator from 'App/Validators/RoundValidator';
import RoundsValidator from 'App/Validators/RoundsValidator';

export default class RoundsController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 10, question, reported } = await request.validate(
      FetchRoundValidator,
    );
    const roundsQuery = Round.query().preload('answers').preload('theme');
    if (reported) {
      roundsQuery.where('reports', '>', 0).orderBy('reports', 'desc');
    }
    if (question) {
      roundsQuery.whereRaw(`LOWER(question) LIKE ?`, ['%' + question.toLowerCase() + '%']);
    }
    const rounds: GetRound[] = await roundsQuery.paginate(page, limit);
    return rounds;
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
    const { answers, ...roundData } = await request.validate(RoundValidator);
    const round = await Round.findOrFail(id);
    await round.related('answers').query().delete();
    const createdAnswers = await round.related('answers').createMany(answers);
    round.merge(roundData);
    round.save();
    // @ts-ignore looking for a way to remove this type error
    round.answers = createdAnswers;
    return round;
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

  public async getAll() {
    return Round.query()
      .preload('answers', (query) => {
        query.select('roundId', 'answer');
      })
      .select('id', 'question', 'themeId', 'difficultyId', 'maxNumberOfGuesses');
  }

  public async report(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const round = await Round.findOrFail(id);
    round.reports += 1;
    round.save();
  }
}
