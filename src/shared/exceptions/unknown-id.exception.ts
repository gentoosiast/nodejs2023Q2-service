export class UnknownIdException extends Error {
  constructor(idName: string) {
    super(`Unknown ${idName}, entity with such id does not exists`);
    this.name = 'UnknownIdException';
  }
}
