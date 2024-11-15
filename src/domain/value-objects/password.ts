export class Password {
  constructor (private password: string) {}

  getValue() {
    return this.password
  }

  setValue(newValue: string) {
    this.password = newValue
  }
}
