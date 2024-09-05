import { t } from 'elysia';

/**
 * @description Its default validation error
 */
export const defaultError = {
  name: t.String(),
  message: t.String()
}

export const validationError = {
  ...defaultError,
  type: t.String(),
  on: t.String(),
  summary: t.String(),
  property: t.String(),
  expected: t.Unknown(),
  found: t.Unknown(),
  errors: t.Array(
    t.Object({
      summary: t.String(),
      type: t.Number(),
      schema: t.Unknown(),
      path: t.String(),
      value: t.String(),
      message: t.String()
    })
  )
}