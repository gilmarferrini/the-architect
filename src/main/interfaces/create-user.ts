import { CreateUserDTO } from "../dtos/create-user";

export interface CreateUser {
  perform(data: CreateUserDTO): Promise<any>
}
