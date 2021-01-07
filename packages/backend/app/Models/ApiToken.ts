import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

import User from './User';

export default class ApiToken extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public userId: number;

  @column()
  public name: string;

  @column()
  public type: string;

  @column()
  public token: string;

  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
