import { faker } from '@faker-js/faker'
import type { TUser } from '@root/module/users/users.schema'

export function createRandomUser(): TUser {
  return {
    id: faker.number.int(),
    publicId: faker.string.nanoid(),
    fullName: faker.string.sample(5),
    role: 100,
    password: faker.string.sample(6),
    phone: faker.number.int({ min: 7000000000, max: 7900000000 }).toString(),
    status: 100,
    tags: faker.helpers.arrayElements(['cat', 'mouse', 'dog']),
    qr: faker.string.numeric(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    hasMessenger: ['telegram', 'whatsapp'],
    hideContacts: false,
    companyId: faker.number.int(),
  }
}

export const createRandomUsers: TUser[] = Array.from({ length: 5 }, () =>
  createRandomUser(),
)
