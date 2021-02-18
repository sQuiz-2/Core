import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('avatar').defaultTo('1');
      table.string('badge').defaultTo('1');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumns('avatar', 'badge');
    });
  }
}
