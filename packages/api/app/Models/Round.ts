import { BaseModel, column, hasMany, HasMany, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm';
import { DateTime } from 'luxon';

import Answer from './Answer';
import Difficulty from './Difficulty';

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public question: string;

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>;

  @column()
  public difficultyId: number;

  @belongsTo(() => Difficulty)
  public difficulty: BelongsTo<typeof Difficulty>;

  @column()
  public themeId: number;

  @column()
  public validated: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
