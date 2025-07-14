export interface IUserSingInDTO {
  email: string
  password: string
}

export type TLoginProvider = 'google' | 'yandex-id'
export interface ISocialProvider {
  id: string
  icon: any
  provider: TLoginProvider
}
