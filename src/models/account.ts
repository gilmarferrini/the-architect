export class Account {

  constructor (private readonly name: string, private readonly description: string, private readonly id?: number) {}

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
