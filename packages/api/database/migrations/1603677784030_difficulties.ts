import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Difficulties extends BaseSchema {
  protected tableName = 'difficulties';

  public async up() {
    this.schema.raw('DROP TABLE difficulties CASCADE');
  }

  public async down() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title', 80).unique().notNullable();
      table.integer('level').unique().notNullable();
      table.timestamps(true);
    });
  }
}
