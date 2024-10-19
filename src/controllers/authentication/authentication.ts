import { EncrypterAdapter } from '../../adapters/encrypter-adapter';
import { UserRepository } from '../../contracts/user-repository';
import { Password } from '../../models/password';
import jsonwebtoken from 'jsonwebtoken'

interface AuthenticateDTO {
  email: string
  password: string
}

export class AuthenticationController {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly encrypterAdapter: EncrypterAdapter
  ) {}

  async authenticate(input: AuthenticateDTO) {
    const user = await this.userRepository.findByEmail(input.email);
    const password = new Password(input.password)
    const passwordIsEqual = this.encrypterAdapter.compare({ rawValue: password.getValue(), value: user.getPassword() })

    if (!passwordIsEqual) {
      throw new Error('The passwords are not the same')
    }

    const token = jsonwebtoken.sign({
      id: user.getId(),
      email: user.getName(),
      name: user.getName()
    }, 'DJM431G4H78979%$FDS#DFDSGHFD(FGS@FDSFSGF*', {
      expiresIn: '12h',
    })

    return token
  }

}
