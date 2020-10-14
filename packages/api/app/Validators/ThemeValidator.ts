import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class ThemeValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.unique({ table: 'themes', column: 'title' }),
      rules.maxLength(80),
      rules.minLength(2),
    ]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'title.unique': 'This theme title already exist.',
    'title.required': 'Provide a theme title',
    'title.maxLength': 'Theme title should not be more than 80 characters.',
    'title.minLength': 'Theme title should not be less than 2 characters.',
  };
}
