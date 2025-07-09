<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FormLogin from '~/components/forms/login/FormLogin.vue'
import FormLoginActions from '~/components/forms/login/FormLoginActions.vue'

const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const formData = ref({
  switch: false,
  email: undefined,
  phone: undefined,
  password: undefined,
  readonly: true,
})

const signInHandler = async () => {
  try {
    await userStore.signIn(formData.value)
  } finally {
    if (user.value) await router.push('/dashboard')
  }
}
</script>

<template>
  <section class="section-auth h-full">
    <div class="container h-full">
      <div class="w-full min-h-[65vh] flex justify-center items-center">
        <DefaultCard title="ash-qrb.org">
          <FormLogin
              v-model="formData"
              @onSubmit="signInHandler"
          />

          <template #footer>
            <FormLoginActions
                @onSubmit="signInHandler"
            />
          </template>
        </DefaultCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>