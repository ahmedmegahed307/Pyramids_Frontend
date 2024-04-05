export class Error {
  errors: string[];
  status: number;

  constructor(errors: string[] = [], status: number = 0) {
    this.errors = errors;
    this.status = status;
  }
}

export default Error;