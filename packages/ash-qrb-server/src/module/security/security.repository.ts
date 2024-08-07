import { env } from '@root/env'
import { db } from '@root/module/db/db'
import { TUser, usersSchema } from '@root/module/users/users.schema'
import { eq } from 'drizzle-orm'
import QRCode from 'qrcode'

interface PostParameters {
  body: { phone: string }
  error: (status: number, message: string) => void
}
export const getUserByPhone = async ({
  body,
  error,
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
}: PostParameters): Promise<TUser | void> => {
  const { phone } = body

  try {
    const users = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.phone, phone))
    return users[0]
  } catch (e) {
    return error(
      400,
      `User with phone ${phone} does not exist. Error: ${(e as Error).message}`,
    )
  }
}

export const createUser = async ({ body, error }: PostParameters) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const bodyFields = body as any
  // @ts-ignore
  bodyFields.password = await Bun.password.hash(bodyFields.password.toString())

  try {
    // @ts-ignore
    const user = await db.insert(usersSchema).values(bodyFields).returning()
    const qr = await QRCode.toDataURL(
      `${env.CLIENT_URL}/users/${user[0].id}/badge`,
    )
    const updatedUser = await db
      .update(usersSchema)
      .set({ qr })
      .where(eq(usersSchema.id, user[0].id))
      .returning()

    return updatedUser[0]
  } catch (e) {
    return error(400, `Cant create user. Error: ${(e as Error).message}`)
  }
}
