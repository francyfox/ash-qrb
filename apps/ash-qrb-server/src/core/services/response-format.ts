import { db } from '@/core/db'
import { asc, count, desc, like } from 'drizzle-orm'
import type { PgTableWithColumns } from 'drizzle-orm/pg-core/table'
import { eq } from 'drizzle-orm/sql/expressions/conditions'
import type { BuildSchema } from 'drizzle-typebox'
import { type InputSchema, t } from 'elysia'

export interface IResponseOptionOrder {
  by: 'ask' | 'desk'
  value: string
}

export interface IResponseOptions {
  page: number
  pageSize: number
  order: IResponseOptionOrder
  filter: {
    search: string
  }
}

export const getCollectionItems = async (
  collection: any,
  options: IResponseOptions,
) => {
  const isAsc = options.order.by === 'ask'
  const order = isAsc
    ? asc(collection[options.order.value])
    : desc(collection[options.order.value])
  const items = await db
    .select()
    .from(collection)
    .orderBy(order)
    .limit(options.pageSize)
    .offset((options.page - 1) * options.pageSize)

  const [totalResponse] = await db.select({ count: count() }).from(collection)

  return {
    items,
    count: items.length,
    total: totalResponse?.count,
  }
}

// TODO: destructure params
export const filterByFieldCollectionItems = async (
  collection: PgTableWithColumns<any>,
  field: string,
  value: string,
  options: IResponseOptions,
) => {
  const isAsc = options.order.by === 'ask'
  const order = isAsc
    ? asc(collection[options.order.value])
    : desc(collection[options.order.value])

  const items = await db
    .select()
    .from(collection)
    .where(like(collection[field], `${value || ''}%`))
    .orderBy(order)
    .limit(options.pageSize)
    .offset((options.page - 1) * options.pageSize)

  const [totalResponse] = await db.select({ count: count() }).from(collection)

  return {
    items,
    count: items.length,
    total: totalResponse?.count,
  }
}

export const getCollectionItemEqual = async (
  collection: PgTableWithColumns<any>,
  key: string,
  value: string | number,
) => {
  const [item] = await db
    .select()
    .from(collection)
    .where(eq(collection[key], value))

  return {
    item,
  }
}

export const errorSchema = t.Object({
  title: t.String(),
  detail: t.String(),
})

export const validationCollectionItems = (
  selectSchema: any | BuildSchema<'select', any, any>,
): InputSchema<never> => {
  return {
    detail: { tags: ['App'] },
    query: t.Partial(
      t.Object({
        filter: t.Partial(
          t.Object({
            search: t.String(),
          }),
        ),
        page: t.Number(),
        pageSize: t.Number(),
        order: t.Partial(
          t.Object({
            by: t.Union([t.Literal('ask'), t.Literal('desc')]),
            value: t.String({ description: 'example: name | created_at ...' }),
          }),
        ),
      }),
    ),
    response: {
      200: t.Object({
        items: t.Array(selectSchema),
        count: t.Number(),
        total: t.Number(),
      }),
      500: errorSchema,
    },
  }
}

export const validationCollectionItem = (
  selectSchema: any | BuildSchema<'select', any, any>,
): InputSchema<never> => {
  return {
    detail: { tags: ['App'] },
    response: {
      200: t.Object({
        item: selectSchema,
      }),
      500: errorSchema,
    },
  }
}
