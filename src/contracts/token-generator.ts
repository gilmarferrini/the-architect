
export interface TokenGenerator {
  generateToken({ payload, expiresIn }: { payload: object, expiresIn: string }): string
}
