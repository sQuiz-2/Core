import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RoundStats extends BaseSchema {
  protected tableName = 'round_stats';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('difficulty_id').unsigned().notNullable();
      table.integer('played').defaultTo(0);
      table.integer('correct').defaultTo(0);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
