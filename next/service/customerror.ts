export default class CustomError extends Error {
  at: string;
  constructor(message: string, customMsg?: string) {
    super(message + " : " + customMsg);
    this.name = "CustomError";
  }
}
