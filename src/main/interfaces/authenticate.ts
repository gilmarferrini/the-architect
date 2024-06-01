import { AuthenticateDTO } from "../dtos/authenticate";

export interface Authenticate {
  perform(data: AuthenticateDTO): Promise<any>
}
