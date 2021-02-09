import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';

import Round from './Round';

export default class Report extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public roundId: number;

  @column()
  public question: number;

  @column()
  public answer: number;

  @column()
  public category: number;

  @column()
  public actualize: number;

  @hasOne(() => Round, {
    localKey: 'roundId',
    foreignKey: 'id',
  })
  public round: HasOne<typeof Round>;
}
