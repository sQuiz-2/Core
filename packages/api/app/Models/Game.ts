import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

import Difficulty from './Difficulty';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public difficultyId: number;

  @belongsTo(() => Difficulty)
  public difficulty: BelongsTo<typeof Difficulty>;

  @column()
  public available: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
