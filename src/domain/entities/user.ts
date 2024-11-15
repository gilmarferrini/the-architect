import { Password } from '../value-objects/password'

export class User {
  private password: Password

  constructor (
    private readonly id: string,
    private readonly accountId: string,
    private readonly name: string,
    private readonly email: string,
    password: string,
  ) {
    this.password = new Password(password)
  }

  static create(accountId: string, name: string, email: string, password: string) {
    const id = crypto.randomUUID()
    return new User(id, accountId, name, email, password)
  }

  public getName() {
    return this.name
  }

  public getEmail() {
    return this.email
  }

  public getPassword() {
    return this.password.getValue()
  }

  public getAccountId() {
    return this.accountId
  }

  public getId() {
    return this.id
  }
}
