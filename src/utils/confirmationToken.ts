export class ConfirmationToken {
  private token: string;
  constructor() {
    const characters =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.token = '';
    for (let i = 0; i < 25; i++) {
      this.token += characters[Math.floor(Math.random() * characters.length)];
    }
  }

  get() {
    return this.token;
  }
}
