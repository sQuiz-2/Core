import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class AuthValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'email.required': 'Votre email est requise',
    'email.email': "Format de l'email invalide",
    'email.exists': 'Email inconnue',
    'password.required': 'Votre mot de passe est requis',
  };
}
