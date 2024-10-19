
export interface Encrypter {
  encrypt({ rawValue, salt }: { rawValue: string, salt: string | number }): string
}
