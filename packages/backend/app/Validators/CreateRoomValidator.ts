import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';

export default class CreateRoomValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    antiCheat: schema.boolean(),
    players: schema.number([rules.range(10, 200)]),
    selectedDifficulty: schema.string(),
    timeBetweenGames: schema.number([rules.range(10, 120)]),
    timeBetweenQuestion: schema.number([rules.range(5, 25)]),
    timeToAnswer: schema.number([rules.range(6, 25)]),
    selectedThemes: schema
      .array()
      .members(schema.number([rules.exists({ table: 'themes', column: 'id' })])),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {};
}
