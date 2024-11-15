import { EncrypterAdapter } from '../../../adapters/encrypter-adapter';
import { TokenGenerator } from '../../../adapters/token-adapter';
import { Password } from '../../../domain/value-objects/password';
import { UserRepository } from '../../repositories/user-repository';

interface AuthenticateDTO {
  email: string
  password: string
}

export class AuthenticationController {

  constructor (
    private readonly userRepository: UserRepository,
    private readonly encrypterAdapter: EncrypterAdapter,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async authenticate(input: AuthenticateDTO) {
    const user = await this.userRepository.findByEmail(input.email);
    const password = new Password(input.password)
    const passwordIsEqual = this.encrypterAdapter.compare({ rawValue: password.getValue(), value: user.getPassword() })

    if (!passwordIsEqual) {
      throw new Error('The passwords are not the same')
    }

    const token = this.tokenGenerator.generateToken({
      payload: {
        id: user.getId(),
        email: user.getName(),
        name: user.getName()
      },
      expiresIn: '12h'
    })

    return token
  }

}
