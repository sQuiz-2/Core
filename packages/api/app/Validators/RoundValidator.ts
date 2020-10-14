import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';

export default class RoundValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    themeId: schema.number(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'answers.required': 'Réponse manquante',
    'answers.maxLength': 'La reponse ne doit pas faire plus de 80 caractères.',
    'answers.minLength': 'La réponse doit faire au moins 1 caractère.',
    'themeId.required': 'Thème manquant',
  };
}
