export class Database<T> {
  private db = new Map<string, T>();

  add(id: string, value: T): void {
    this.db.set(id, value);
  }

  findAll(): T[] {
    return [...this.db.values()];
  }

  findOne(id: string): T | null {
    return this.db.get(id) ?? null;
  }

  findMany(ids: string[]): T[] {
    return ids.map((id) => this.findOne(id));
  }

  forEach(cb: (value: T) => void) {
    this.db.forEach(cb);
  }

  has(id: string): boolean {
    return this.db.has(id);
  }

  delete(id: string): boolean {
    if (this.db.has(id)) {
      this.db.delete(id);
      return true;
    }

    return false;
  }
}
