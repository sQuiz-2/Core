import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Answers extends BaseSchema {
  protected tableName = 'answers'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('prefix')
    })
  }

  public async down () {
    this.schema.table(this.tableName, (table) => {
      table.string('prefix', 20);
    })
  }
}
