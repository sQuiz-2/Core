import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ReportRounds extends BaseSchema {
  protected tableName = 'reports';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('round_id').unsigned().references('id').inTable('rounds').onDelete('CASCADE');
      table.integer('question').defaultTo(0);
      table.integer('answer').defaultTo(0);
      table.integer('category').defaultTo(0);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
