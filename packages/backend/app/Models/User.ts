import Hash from '@ioc:Adonis/Core/Hash';
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm';
import { ProviderEnum } from '@squiz/shared';
import { DateTime } from 'luxon';

import ApiToken from './ApiToken';
import OauthToken from './OauthToken';
import UserBadges from './UserBadge';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column()
  public username: string;

  @column()
  public password: string;

  @column()
  public experience: number;

  @column()
  public avatar: string;

  @column()
  public badge: string;

  @hasMany(() => UserBadges)
  public badges: HasMany<typeof UserBadges>;

  @column()
  public staff: boolean;

  @column()
  public ban: boolean;

  @column()
  public banReason: string;

  @column()
  public rememberMeToken?: string;

  @column()
  public providerId: ProviderEnum;

  @column()
  public providerUserId: string;

  @column()
  public rank: string;

  @hasMany(() => OauthToken)
  public oAuthToken: HasMany<typeof OauthToken>;

  @hasMany(() => ApiToken)
  public apiToken: HasMany<typeof ApiToken>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
