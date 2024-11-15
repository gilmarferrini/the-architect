import bcrypt from 'bcryptjs'

export interface Encrypter {
  encrypt({ rawValue, salt }: { rawValue: string, salt: string | number }): string
}

export class EncrypterAdapter implements Encrypter {

  public encrypt({ rawValue, salt }: { rawValue: string; salt: number | string }): string {
    return bcrypt.hashSync(rawValue, salt)
  }

  public compare({ rawValue, value }: { rawValue: string, value: string }): boolean {
    return bcrypt.compareSync(rawValue, value)
  }

}
