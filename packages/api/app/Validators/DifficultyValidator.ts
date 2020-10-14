import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class DifficultyValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [rules.maxLength(80)]),
    level: schema.number(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'title.required': 'Titre requis',
    'level.required': 'Niveau requis',
    'title.maxLength': 'Le titre doit faire moins de 80 caractères',
  };
}
