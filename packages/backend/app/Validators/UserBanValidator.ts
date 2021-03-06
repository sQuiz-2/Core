import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { rules, schema } from '@ioc:Adonis/Core/Validator';

export default class UserBanValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    reason: schema.string({}, [rules.maxLength(200)]),
  });

  public messages = {};
}
