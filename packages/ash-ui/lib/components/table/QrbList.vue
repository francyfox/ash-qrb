<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { h, resolveComponent, type Ref, watch, onMounted } from 'vue'
// import type { TQrbItem } from '~/types/qrb.types'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDayjs } from '~/composable/dayjs.ts'

type TQrbItem = any

const emit = defineEmits<{
  onEdit: [id: string]
  onSelect: []
}>()

const { list = [], providers } = defineProps<{
  list: TQrbItem[]
  providers: any
  loading: boolean
}>()

const pagination = defineModel<{
  pageIndex: number
  pageSize: number
}>('pagination')

const filter = defineModel<{
  search: string
}>('filter')

const { UDropdownMenu, toast } = providers

const UButton = resolveComponent('UButton')
const UBadge = resolveComponent('UBadge')
const UCheckbox = resolveComponent('UCheckbox')

const { t } = useI18n()
const dayjs = useDayjs()
const table = useTemplateRef('table')

const columns: TableColumn<TQrbItem>[] = [
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
    cell: ({ row }) => `${row.getValue('id')}`,
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        1: 'success' as const,
        0: 'error' as const,
      }[row.getValue('status') as string]

      return h(
        UBadge,
        { size: 'xl', class: 'capitalize', variant: 'subtle', color },
        () => {
          return row.getValue('status') === 1 ? 'ENABLED' : 'DISABLED'
        },
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => {
      return dayjs(row.getValue('createdAt')).format('DD-MM-YYYY HH:mm')
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            size: 'xl',
            content: {
              align: 'end',
            },
            items: getRowItems(row),
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      )
    },
  },
]

const rowSelection = ref<Record<string, boolean>>({})

function onSelect(row: TableRow<TQrbItem>, e?: Event) {
  /* If you decide to also select the column you can do this  */
  row.toggleSelected(!row.getIsSelected())
}

function getRowItems(row: Row<TQrbItem>) {
  return [
    {
      type: 'label',
      label: 'Actions',
    },
    {
      label: t('qrbActionCopy'),
      onSelect() {
        navigator.clipboard.writeText(
          `${window.location.origin}/qrb/${row.original.id}`,
        )

        toast.add({
          title: 'QRB URL copied to clipboard!',
          color: 'success',
          icon: 'i-lucide-circle-check',
        })
      },
    },
    {
      label: t('qrbActionView'),
      to: `/qrb/${row.original.id}`,
    },
    {
      label: t('qrbActionEdit'),
      onClick() {
        emit('onEdit', row.original.id)
      },
    },
  ]
}

const columnFilters = ref([
  {
    id: 'name',
    value: '',
  },
])

const tableTotal: Ref<number | undefined> = computed(
  () => table.value?.tableApi?.getFilteredRowModel().rows.length,
)

const breakpoints = useBreakpoints(breakpointsTailwind)
const lg = breakpoints.smaller('lg')

const hiddenColsOnLgPattern = new RegExp(['id', 'createdAt'].join('|'), 'gi')
const hiddenColsOnLg = computed(() =>
  table.value?.tableApi
    .getAllColumns()
    .filter((col) => hiddenColsOnLgPattern.test(col.id)),
)

function hideCols(v) {
  for (const col of hiddenColsOnLg.value) {
    col.toggleVisibility(!v)
  }
}

watch(lg, (v) => {
  hideCols(v)
})

onMounted(() => {
  hideCols(lg.value)
})
</script>

<template>
  <div class="h-full qrb-table">
    <div class="h-full w-full flex flex-col justify-between space-y-4 pb-4">
      <div class="flex px-4 py-3.5 border-b border-accented">
        <UInput
            v-model="filter.search"
            size="xl"
            class="max-w-sm"
            placeholder="Filter names..."
        />
      </div>
      <UTable
          ref="table"
          v-model:column-filters="columnFilters"
          :loading="loading"
          :data="list"
          :columns="columns"
          :ui="{ td: 'text-xl', th: 'text-xl' }"
          class="flex-1"
      />

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
    </div>
  </div>
</template>

<style scoped>

</style>