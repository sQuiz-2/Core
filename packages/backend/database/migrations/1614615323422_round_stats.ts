import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class RoundStats extends BaseSchema {
  protected tableName = 'round_stats';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.integer('played').defaultTo(1).alter();
      table.integer('correct').defaultTo(1).alter();
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.integer('played').defaultTo(0).alter();
      table.integer('correct').defaultTo(0).alter();
    });
  }
}
