import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import { ProviderEnum } from 'App/enums/oAuthProviders';

export default class OAuthValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    provider: schema.enum(Object.values(ProviderEnum)),
    code: schema.string(),
  });

  public messages = {
    'provider.required': 'Le paramètre provider est requis',
    'provider.enum': 'Le provider doit faire partie de la liste des providers',
    'code.required': 'Le paramètre code est requis',
  };
}
