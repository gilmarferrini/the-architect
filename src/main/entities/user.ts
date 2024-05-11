export class User {

  constructor (
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public account_id: string,
    public archived: boolean,
    public user_type: string
  ) {}

}
