export interface UseCase<T, J> {
  execute(input: T): Promise<J>
}
