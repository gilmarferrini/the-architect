import crypto from 'crypto'

export class Account {

  constructor (private id: string, private name: string, private description: string) {}

  static create(name: string, description: string) {
    const id = crypto.randomUUID()
    return new Account(id, name, description)
  }

  public getId() {
    return this.id
  }

  public getName() {
    return this.name
  }

  public getDescription() {
    return this.description
  }

}
