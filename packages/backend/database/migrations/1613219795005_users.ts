import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('experience').defaultTo(0);
      table.index('experience');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('experience');
      table.dropIndex('experience');
    });
  }
}
