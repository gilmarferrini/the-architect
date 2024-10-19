export class Password {
  constructor (private password: string) {}

  getValue() {
    console.log(this.password)
    return this.password
  }

  setValue(newValue: string) {
    this.password = newValue
  }
}
