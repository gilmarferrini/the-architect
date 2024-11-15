import jsonwebtoken from 'jsonwebtoken'

export interface TokenGenerator {
  generateToken({ payload, expiresIn }: { payload: object, expiresIn: string }): string
}


export class TokenAdapter implements TokenGenerator {

  generateToken({ payload, expiresIn }: { payload: object, expiresIn: string }) {
    return jsonwebtoken.sign(payload, 'DJM431G4H78979%$FDS#DFDSGHFD(FGS@FDSFSGF*', {
      expiresIn,
    })
  }

}
