import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('password').nullable().alter();
      table.string('username', 25);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      // Will only works if all passwords are not Null
      table.string('password').notNullable().alter();
      table.dropColumn('username');
    });
  }
}
