export class InvalidCredentialsError extends Error {
  constructor() {
    super("credentials are invalid");
  }
}

