export class Database {
  #database = {};

  #getTable(tableName) {
    return this.#database[tableName];
  }

  #getRow(tableName, id) {
    const table = this.#getTable(tableName) ?? [];
    const index = table.findIndex((row) => row.id === id);
    return { row: table[index], index };
  }

  insert(tableName, data) {
    const table = this.#getTable(tableName);
    table ? table.push(data) : (this.#database[tableName] = [data]);
  }

  select(tableName, search) {
    const table = this.#getTable(tableName) ?? [];
    const { title = "", description = "" } = search ?? {};

    const filteredTable = table.filter(
      (row) =>
        row.title.includes(title) && row.description.includes(description)
    );

    return filteredTable;
  }

  update(tableName, id, data) {
    const { row } = this.#getRow(tableName, id);

    if (row) {
      row = { ...row, ...data };
    } else {
      throw new Error("Resource Not Found!");
    }
  }

  delete(tableName, id) {
    const { index } = this.#getRow(tableName, id);

    if (index > -1) {
      const table = this.#getTable(tableName);
      table.splice(index, 1);
    } else {
      throw new Error("Resource Not Found!");
    }
  }
}
