import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class FetchRoundValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    page: schema.number.optional(),
    limit: schema.number.optional([rules.range(1, 100)]),
    question: schema.string.optional({ trim: true }),
    reported: schema.boolean.optional(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'page.number': 'Le paramètre page doit être un nombre',
    'limit.number': 'Le paramètre limit doit être un nombre',
    'limit.range': 'Le paramètre limit doit être compris entre 1 et 100',
  };
}
