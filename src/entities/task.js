import { randomUUID } from "node:crypto";

export class Task {
  #data = {};

  constructor({
    id,
    title,
    description,
    completed_at,
    created_at,
    updated_at,
  } = {}) {
    this.#data.id = id ?? randomUUID();
    this.#data.title = title ?? "";
    this.#data.description = description ?? "";
    this.#data.completed_at = completed_at ?? null;
    this.#data.created_at = created_at ?? new Date();
    this.#data.updated_at = updated_at ?? new Date();
  }

  get data() {
    return Object.freeze(this.#data);
  }

  toggleCompleteStatus() {
    const newData = { ...this.#data, updated_at: new Date() };

    const isCompleted = !!this.#data.completed_at;
    newData.completed_at = isCompleted ? null : new Date();

    this.#data = newData;
  }

  update({ title, description }) {
    const newData = { ...this.#data };

    if (title || description) {
      title && (newData.title = title);
      description && (newData.description = description);
      newData.updated_at = new Date();
    }

    this.#data = newData;
  }
}
