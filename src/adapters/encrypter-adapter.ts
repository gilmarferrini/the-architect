import { Encrypter } from '../contracts/encrypter';
import bcrypt from 'bcryptjs'

export class EncrypterAdapter implements Encrypter {

  public encrypt({ rawValue, salt }: { rawValue: string; salt: number | string }): string {
    return bcrypt.hashSync(rawValue, salt)
  }

}
