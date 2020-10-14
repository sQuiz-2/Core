import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Rounds extends BaseSchema {
  protected tableName = 'rounds';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('data', 500);
      table.integer('theme_id').unsigned();
      table.foreign('theme_id').references('themes.id').onDelete('CASCADE');
      table.integer('difficulty_id').unsigned();
      table.foreign('difficulty_id').references('difficulties.id').onDelete('CASCADE');
      table.boolean('validated').defaultTo(false).notNullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
