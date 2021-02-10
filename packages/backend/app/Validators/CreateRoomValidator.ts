import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CreateRoomValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    antiCheat: schema.boolean(),
    players: schema.number([rules.range(10, 250)]),
    selectedDifficulty: schema.string(),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {};
}
