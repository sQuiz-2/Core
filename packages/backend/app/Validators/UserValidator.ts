import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { Avatars } from '@squiz/shared';

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.string({}, [rules.keyOf(Avatars)]),
    /* badge: schema.string({}, [rules.keyOf(Badges)]), */
  });

  public messages = {};
}
