import { Password } from './password'

export class User {

  constructor (
    private readonly name: string,
    private readonly email: string,
    private readonly password: Password,
    private readonly account_id: number
  ) {}

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
    return this.account_id
  }
}
