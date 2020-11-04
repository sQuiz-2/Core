import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Answers extends BaseSchema {
  protected tableName = 'answers';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('round_id').unsigned();
      table.foreign('round_id').references('rounds.id').onDelete('CASCADE');
      table.string('answer', 80).notNullable();
      table.string('prefix', 20);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
