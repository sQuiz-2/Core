import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

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
}
