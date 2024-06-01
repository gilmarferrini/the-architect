import { AuthenticateDTO } from "../dtos/authenticate";
import { InvalidResourceError } from "../errors/invalid-resource";
import { Authenticate } from "../interfaces/authenticate";
import { UsersRepository } from "../repositories/interfaces/users-repository";


export class AuthenticateUseCase implements Authenticate{

  constructor (private readonly usersRepository: UsersRepository) {}

  async perform({ email, password }: AuthenticateDTO) {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidResourceError();
    }
  }
}
