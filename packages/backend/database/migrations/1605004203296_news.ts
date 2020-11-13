import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class News extends BaseSchema {
  protected tableName = 'news';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.text('content').notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
