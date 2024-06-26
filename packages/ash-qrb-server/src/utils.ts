import { nanoid } from 'nanoid'

export const generateId = () => {
  return nanoid()
}

export const defaultItemsResponse = (items: unknown[], name: string) => {
  return {
    items,
    count: items.length,
  }
}
