import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { RewardsId, Streamers } from '@squiz/shared';

export default class TwitchBuyableBadgeValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    userId: schema.string(),
    rewardId: schema.string({}, [rules.enumNumber(Object.values(RewardsId))]),
    streamerId: schema.string({}, [rules.enumNumber(Object.values(Streamers))]),
  });

  public messages = {};
}
