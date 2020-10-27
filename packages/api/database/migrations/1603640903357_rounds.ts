import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('max_number_of_guesses').unsigned().defaultTo(4);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('max_number_of_guesses');
    });
  }
}
