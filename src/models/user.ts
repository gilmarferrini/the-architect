import { Password } from './password'

export class User {

  constructor (
    private readonly id: string,
    private readonly accountId: string,
    private readonly name: string,
    private readonly email: string,
    private readonly password: Password,
  ) {}

  static create(accountId: string, name: string, email: string, password: Password) {
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
