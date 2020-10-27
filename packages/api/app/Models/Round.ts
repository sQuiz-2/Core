import { BaseModel, column, hasMany, HasMany, computed } from '@ioc:Adonis/Lucid/Orm';
import { Difficulty, DifficultyEnum, GetDifficultyFromId } from 'App/Enums/Difficulty';
import { DateTime } from 'luxon';

import Answer from './Answer';

export default class Round extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public question: string;

  @hasMany(() => Answer)
  public answers: HasMany<typeof Answer>;

  @column({ serializeAs: 'difficultyId' })
  public difficultyId: DifficultyEnum;

  @computed()
  public get difficulty(): Difficulty {
    return GetDifficultyFromId(this.difficultyId);
  }

  @column()
  public themeId: number;

  @column()
  public validated: boolean;

  @column.dateTime({ autoCreate: true, serializeAs: 'createdAt' })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: 'updatedAt' })
  public updatedAt: DateTime;

  @column({ serializeAs: 'maxNumberOfGuesses' })
  public maxNumberOfGuesses: number;
}
