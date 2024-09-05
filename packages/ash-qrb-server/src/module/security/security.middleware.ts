import { pluginLucia } from '@root/core/module/plugin/plugin.auth';
import type { TUser } from '@root/module/users/users.schema';
import { Elysia } from 'elysia';

export const securityMiddleware = new Elysia({ name: '@security/middleware' })
  .use(pluginLucia.elysia)
  .macro(({ onBeforeHandle }) => {
    return {
      status(status: TUser['status']) {
        onBeforeHandle(async function validateStatus({ user }) {
          await user.validate()
          console.log(user)
        })
      }
    }
  })