import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.boolean('played').defaultTo(false);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('played');
    });
  }
}
