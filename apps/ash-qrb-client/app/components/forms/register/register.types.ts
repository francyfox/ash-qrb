import type { IUserSingInDTO } from '~/components/forms/login/login.types'

export interface IUserSingUpDTO extends IUserSingInDTO {
  name: string
  image: string
}

export interface IUser extends IUserSingUpDTO {
  phone?: string
  repeatPassword?: string
}
