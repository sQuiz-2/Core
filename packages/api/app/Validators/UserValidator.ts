import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class UserValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({}, [rules.email(), rules.unique({ table: 'users', column: 'email' })]),
    password: schema.string({}, [rules.maxLength(180), rules.minLength(8)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'email.required': 'Votre email est requise',
    'email.email': "Format de l'email invalide",
    'email.unique': 'Un compte possède déjà cette email',
    'password.required': 'Mot de passe requis',
    'password.maxLength': 'Votre mot de passe doit faire moins de 180 caractères',
    'password.minLength': 'Votre mot de passe doit faire au moins 8 caractères',
  };
}
