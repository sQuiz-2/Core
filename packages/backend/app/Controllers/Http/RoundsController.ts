import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Report from 'App/Models/Report';
import Round from 'App/Models/Round';
import FetchRoundValidator from 'App/Validators/FetchRoundValidator';
import ReportValidator from 'App/Validators/ReportValidator';
import RoundValidator from 'App/Validators/RoundValidator';
import RoundsValidator from 'App/Validators/RoundsValidator';

export default class RoundsController {
  public async index({ request }: HttpContextContract) {
    const { page = 1, limit = 10, question, reported } = await request.validate(
      FetchRoundValidator,
    );
    if (reported) {
      return Report.query()
        .orderBy(Database.raw('question + answer + category + actualize'), 'desc')
        .preload('round', (builder) => {
          builder.preload('answers');
        })
        .paginate(page, limit);
    } else {
      const roundsQuery = Round.query().preload('answers').orderBy('id');
      if (question) {
        roundsQuery.whereRaw(`LOWER(question) LIKE ?`, ['%' + question.toLowerCase() + '%']);
      }
      return roundsQuery.paginate(page, limit);
    }
  }

  public async store({ request }: HttpContextContract) {
    const { answers, ...roundData } = await request.validate(RoundValidator);
    const round = await Round.create({
      ...roundData,
      validated: true,
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

  public async report({ params, auth, request }: HttpContextContract) {
    const { reports } = await request.validate(ReportValidator);
    const { id } = params;
    const round = await Round.query().where('id', id).preload('reports').firstOrFail();
    const mergedReports = {};
    for (const i in reports) {
      if (!reports[i]) continue;
      mergedReports[i] = 1;
      if (round.reports) {
        mergedReports[i] += round.reports[i];
      }
      if (auth.user?.staff) {
        mergedReports[i] += 100;
      }
    }
    if (Object.keys(mergedReports).length > 0) {
      round.related('reports').updateOrCreate({ roundId: round.id }, mergedReports);
    }
  }
}
