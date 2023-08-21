export class UniqueConstraintException extends Error {
  constructor(message = 'Unique constraint failed') {
    super(message);
    this.name = 'UniqueConstraintException';
  }
}
