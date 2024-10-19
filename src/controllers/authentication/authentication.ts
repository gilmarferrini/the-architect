import { UserRepository } from '../../contracts/user-repository';

interface AuthenticateDTO {
  email: string
  password: string
}

export class AuthenticationController {

  constructor (
    private readonly userRepository: UserRepository
  ) {}

  async authenticate(input: AuthenticateDTO) {
    await this.userRepository.findByEmail(input.email);
  }

}
