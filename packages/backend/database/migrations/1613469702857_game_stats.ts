import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class GameStats extends BaseSchema {
  protected tableName = 'game_stats';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('difficulty_id').unsigned().notNullable();
      table.integer('played').defaultTo(0);
      table.integer('win').defaultTo(0);
      table.integer('podium').defaultTo(0);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
