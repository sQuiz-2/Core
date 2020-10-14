import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class GameValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(80)]),
    difficultyId: schema.number([rules.exists({ table: 'difficulties', column: 'id' })]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'title.required': 'Un titre est requis',
    'difficultyId.required': 'Une difficulté est requise',
    'difficultyId.exists': 'Difficulté inconnue',
  };
}
