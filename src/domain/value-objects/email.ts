export class Email {
  constructor (private email: string) {}

  getValue() {
    return this.email;
  }

  setValue(email: string) {
    this.email = email;
  }
}
