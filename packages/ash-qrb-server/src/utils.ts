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
