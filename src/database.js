import fs from "fs/promises";

const PATH_TO_DB = new URL("../data.json", import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(PATH_TO_DB, "utf-8")
      .then((data) => (this.#database = JSON.parse(data)))
      .catch(() => this.#persist());
  }

  #getTable(tableName) {
    return this.#database[tableName];
  }

  #getRow(tableName, id) {
    const table = this.#getTable(tableName) ?? [];
    const index = table.findIndex((row) => row.id === id);
    return { row: table[index], index };
  }

  #persist() {
    fs.writeFile(PATH_TO_DB, JSON.stringify(this.#database, null, 2));
  }

  findData(tableName, id) {
    const { row } = this.#getRow(tableName, id);
    return row;
  }

  insert(tableName, data) {
    const table = this.#getTable(tableName);
    table ? table.push(data) : (this.#database[tableName] = [data]);
    this.#persist();
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

  update(tableName, data) {
    let { index } = this.#getRow(tableName, data.id);

    if (index > -1) {
      const table = this.#getTable(tableName);
      table[index] = data;
      this.#persist();
    } else {
      throw new Error("Resource Not Found!");
    }
  }

  delete(tableName, id) {
    const { index } = this.#getRow(tableName, id);

    if (index > -1) {
      const table = this.#getTable(tableName);
      table.splice(index, 1);
      this.#persist();
    } else {
      throw new Error("Resource Not Found!");
    }
  }
}
