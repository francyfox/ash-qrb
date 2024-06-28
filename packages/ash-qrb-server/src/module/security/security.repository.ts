import { env } from '@root/env'
import { db } from '@root/module/db/db'
import { usersSchema } from '@root/module/users/users.schema'
import { eq } from 'drizzle-orm'
import QRCode from 'qrcode'

interface PostParameters {
  body: { phone: string }
  error: (status: number, message: string) => void
}
export const getUserByPhone = async ({ body, error }: PostParameters) => {
  const { phone } = body

  try {
    const user = await db
      .select()
      .from(usersSchema)
      .where(eq(usersSchema.phone, phone))
    return user
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
  bodyFields.password = await Bun.password.hash(bodyFields.password, {
    memoryCost: 4,
    timeCost: 3,
  })

  try {
    // @ts-ignore
    const { id } = await db.insert(usersSchema).values(bodyFields).returning()
    const qr = await QRCode.toDataURL(`${env.CLIENT_URL}/users/${id}/badge`)
    const user = await db
      .update(usersSchema)
      .set({ qr })
      .where(eq(usersSchema.id, id))
      .returning()
  } catch (e) {
    return error(400, `Cant create user. Error: ${(e as Error).message}`)
  }
}
