import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Reports extends BaseSchema {
  protected tableName = 'reports';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('actualize').defaultTo(0);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('actualize');
    });
  }
}
