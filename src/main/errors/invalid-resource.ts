import { CustomError } from "./custom-error";

export class InvalidResourceError extends CustomError {
  constructor() {
    super('Invalid resource!')
  }
}
