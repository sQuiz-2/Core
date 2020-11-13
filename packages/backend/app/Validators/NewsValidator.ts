import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class NewsValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true }, [rules.minLength(10), rules.maxLength(1000)]),
  });

  public messages = {
    'content.required': 'Un contenu est requis',
    'content.minLength': 'Le contenu doit au moins 10 caractères',
    'content.maxLength': 'Le contenu doit faire moins de 1000 caractères',
  };
}
