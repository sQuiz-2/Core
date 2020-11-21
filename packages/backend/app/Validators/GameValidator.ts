import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { DifficultyEnum } from '@squiz/shared';

export default class GameValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(80)]),
    difficultyId: schema.number([rules.enumNumber(Object.values(DifficultyEnum))]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'title.required': 'Un titre est requis',
    'difficultyId.required': 'Une difficulté est requise',
    'difficultyId.enumNumber': 'Difficulté inconnue',
    'difficultyId.number': 'Ce paramètre doit être un nombre',
  };
}
