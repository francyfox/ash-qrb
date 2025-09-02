<script setup lang="ts">
import { useDayjs } from 'ash-libs'
import { useI18n } from 'vue-i18n'
import type { operations } from '~/assets/schema.ts'
import type { TableColumn } from '@nuxt/ui'
import { h, resolveComponent, useTemplateRef } from 'vue'
import { VueCodeHighlighter } from 'vue-code-highlighter'
import 'vue-code-highlighter/dist/style.css'
import { truncateText } from '~/utils/text.ts'
import TimePast from '~/components/TimePast.vue'

const emit = defineEmits<{
  onEdit: [id: string]
  onSelect: []
}>()

const { loading } = defineProps<{
  loading: boolean
  list: []
}>()

type TTaskItem =
  operations['getSPrivateQueue']['responses']['200']['content']['application/json']['items'] extends readonly (infer T)[]
    ? T
    : never

const { t } = useI18n()

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')
const USlideover = resolveComponent('USlideover')

const dayjs = useDayjs()
const table = useTemplateRef('table')
const columns: TableColumn<TTaskItem>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        modelValue: table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'aria-label': 'Select all',
        ui: { base: 'bg-(--color-s-purple-taupe)' },
        onClick: () => emit('onSelect'),
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          row.toggleSelected(!!value),
        'aria-label': 'Select row',
        ui: { base: 'bg-(--color-s-purple-taupe)' },
        onClick: () => emit('onSelect'),
      }),
  },
  {
    accessorKey: 'id',
    header: '# ID',
  },
  {
    accessorKey: 'status',
    header: () => t('tableStatus'),
    cell: ({ row }) => {
      const color = {
        SUCCESS: 'success' as const,
        FAILED: 'error' as const,
        IN_QUEUE: 'info' as const,
        IN_PROGRESS: 'warning' as const,
      }[row.getValue('status') as string]

      return h(
        UBadge,
        { size: 'xl', class: 'capitalize', variant: 'subtle', color },
        () => {
          const v = row.getValue('status')

          switch (v) {
            case 'SUCCESS':
              return t('queueStatusSuccess')
            case 'FAILED':
              return t('queueStatusFailed')
            case 'IN_PROGRESS':
              return t('queueStatusInProgress')
            case 'IN_QUEUE':
              return t('queueStatusInQueue')
          }
        },
      )
    },
  },
  {
    accessorKey: 'value',
    header: 'value',
    cell: ({ row }) =>
      h(
        USlideover,
        {
          side: 'bottom',
        },
        {
          default: () => {
            if (!row.getValue('value')) {
              return 'null'
            }

            return h(
              UButton,
              {
                color: 'neutral',
                variant: 'outline',
                class: 'text-muted truncate',
              },
              () => truncateText(row.getValue('value'), 25),
            )
          },
          content: () =>
            h(
              VueCodeHighlighter,
              {
                code: row.getValue('value'),
                lang: 'json',
                class: 'p-5 !rounded-none',
              },
              row.getValue('value'),
            ),
        },
      ),
  },
  {
    accessorKey: 'logs',
    header: 'logs',
  },
  {
    accessorKey: 'createdAt',
    header: () => t('tableCreatedAt'),
    cell: ({ row }) => {
      const timestamp = Number(row.getValue('createdAt'))
      if (timestamp === 0) return 'null'

      return dayjs(timestamp).format('DD-MM-YYYY HH:mm')
    },
  },
  {
    accessorKey: 'execStartAt',
    header: () => t('tableExecStartAt'),
    cell: ({ row }) =>
      h(TimePast, {
        timestamp: Number(row.getValue('execStartAt')),
      }),
  },
  {
    accessorKey: 'completedAt',
    header: () => t('tableCompletedAt'),
    cell: ({ row }) =>
      h(TimePast, {
        timestamp: Number(row.getValue('completedAt')),
      }),
  },
]
</script>

<template>
  <UTable
      ref="table"
      :loading="loading"
      :data="list"
      :columns="columns"
      :ui="{ td: 'text-xl', th: 'text-xl' }"
      class="flex-1"
  >
    <div class="px-4 py-3.5 text-md text-muted">
      {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
          v-model:page="pagination.pageIndex"
          :items-per-page="pagination.pageSize"
          :total="pagination.total"
          show-last
          show-first
      />
    </div>
  </UTable>
</template>

<style scoped>

</style>