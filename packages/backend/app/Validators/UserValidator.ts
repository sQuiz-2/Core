import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { Avatars, badgeNames } from '@squiz/shared';

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    avatar: schema.string.optional({}, [rules.keyOf(Avatars)]),
    badge: schema.string.optional({}, [rules.keyOf(badgeNames)]),
  });

  public messages = {};
}
