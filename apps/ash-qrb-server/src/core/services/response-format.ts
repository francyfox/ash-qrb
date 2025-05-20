import { db } from '@/core/db'
import { asc, desc, like } from 'drizzle-orm'
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

  return {
    items,
    count: items.length,
  }
}

// TODO: destructure params
export const filterByFieldCollectionItems = async (
  collection: PgTableWithColumns<any>,
  field: string,
  value: string,
  options: IResponseOptions,
) => {
  const items = await db
    .select()
    .from(collection)
    .where(like(collection[field], `%${value}%`))
    .limit(options.pageSize)
    .offset((options.page - 1) * options.pageSize)

  return {
    items,
    count: items.length,
  }
}

export const getCollectionItemEqual = async (
  collection: PgTableWithColumns<any>,
  key: string,
  value: string | number,
) => {
  const item = await db
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
    query: t.Partial(
      t.Object({
        page: t.Number(),
        pageSize: t.Number(),
        order: t.Object({
          by: t.Union([t.Literal('ask'), t.Literal('desc')]),
        }),
      }),
    ),
    response: {
      200: t.Object({
        items: t.Array(selectSchema),
        count: t.Number(),
      }),
      500: errorSchema,
    },
  }
}

export const validationCollectionItem = (
  selectSchema: any | BuildSchema<'select', any, any>,
): InputSchema<never> => {
  return {
    response: {
      200: t.Object({
        item: selectSchema,
      }),
      500: errorSchema,
    },
  }
}
