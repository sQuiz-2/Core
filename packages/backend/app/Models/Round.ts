import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  computed,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm';
import { Difficulty, DifficultyEnum, GetDifficultyFromId } from '@squiz/shared';
import { DateTime } from 'luxon';

import Answer from './Answer';
import Theme from './Theme';

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public question: string;

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>;

  @column()
  public difficultyId: DifficultyEnum;

  @computed()
  public get difficulty(): Difficulty {
    return GetDifficultyFromId(this.difficultyId);
  }

  @belongsTo(() => Theme)
  public theme: BelongsTo<typeof Theme>;

  @column()
  public themeId: number;

  @column()
  public validated: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @column()
  public maxNumberOfGuesses: number;
}
