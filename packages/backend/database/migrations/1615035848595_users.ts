import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('ban_reason');
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('ban_reason');
    });
  }
}
