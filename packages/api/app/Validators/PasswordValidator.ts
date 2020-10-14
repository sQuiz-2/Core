import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class PasswordValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    password: schema.string({}, [rules.maxLength(180), rules.minLength(8)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'password.required': 'Mot de passe requis',
    'password.maxLength': 'Votre mot de passe doit faire moins de 180 caractères',
    'password.minLength': 'Votre mot de passe doit faire au moins 8 caractères',
  };
}
