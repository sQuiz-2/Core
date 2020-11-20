import { BaseModel, column, computed } from '@ioc:Adonis/Lucid/Orm';
import { Difficulty, DifficultyEnum, GetDifficultyFromId } from '@squiz/shared';
import { DateTime } from 'luxon';

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public difficultyId: DifficultyEnum;

  @computed()
  public get difficulty(): Difficulty {
    return GetDifficultyFromId(this.difficultyId);
  }

  @column()
  public available: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
