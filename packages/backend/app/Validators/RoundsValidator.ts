import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { DifficultyEnum } from '@squiz/shared';

export default class RoundsValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    rounds: schema.array().members(
      schema.object().members({
        question: schema.string({ trim: true }, [rules.maxLength(500)]),
        answers: schema.array([rules.distinct('answer')]).members(
          schema.object().members({
            answer: schema.string({ trim: true }, [rules.maxLength(80)]),
          }),
        ),
        themeId: schema.number([rules.exists({ table: 'themes', column: 'id' })]),
        difficultyId: schema.number([rules.enumNumber(Object.values(DifficultyEnum))]),
      }),
    ),
  });

  public cacheKey = this.ctx.routeKey;
}
