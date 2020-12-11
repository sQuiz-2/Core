import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('reports').defaultTo(0);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('reports');
    });
  }
}
