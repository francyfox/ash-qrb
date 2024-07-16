import { nanoid } from 'nanoid'

export const generateId = () => {
  return nanoid()
}

export const defaultItemsResponse = (items: unknown[]) => {
  return {
    items,
    count: items.length,
  }
}

export const defaultItemResponse = (item: unknown) => {
  return {
    item,
  }
}

export const capitalized = (word: string) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const singular = (word: string) => word.slice(0, -1)
