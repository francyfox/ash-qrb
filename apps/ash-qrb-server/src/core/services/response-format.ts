import { db } from '@/core/db'
import { asc, desc } from 'drizzle-orm'
import type { PgTableWithColumns } from 'drizzle-orm/pg-core/table'
import type { BuildSchema } from 'drizzle-typebox/schema.types.internal'
import { t } from 'elysia'

export interface IResponseOptions {
  page: number
  pageSize: number
  order: {
    by: string
    value: string
  }
}

export const getCollectionItems = async (
  collection: PgTableWithColumns<any>,
  options: IResponseOptions,
) => {
  const order =
    options.order.by === 'desc'
      ? desc(collection[options.order.value])
      : asc(collection[options.order.value])
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

export const TGetCollectionItems = (selectSchema: BuildSchema<any, any, any>) =>
  t.Object({
    items: t.Array(selectSchema),
    count: t.Number(),
  })
