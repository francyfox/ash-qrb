<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui'
import type { Row } from '@tanstack/vue-table'
import { getPaginationRowModel } from '@tanstack/vue-table'
import { h, resolveComponent, type Ref } from 'vue'
// import type { TQrbItem } from '~/types/qrb.types'
import { computed, ref, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
// import { QRB_STATUS } from '~/components/forms/qr/qr.schema'
import { useDayjs } from '~/composable/dayjs.ts'

const QRB_STATUS = {}
type TQrbItem = any

const emit = defineEmits<{
  onEdit: [id: string]
}>()

const { list = [], providers } = defineProps<{
  list: TQrbItem[]
  providers: any
}>()

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
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          row.toggleSelected(!!value),
        'aria-label': 'Select row',
        ui: { base: 'bg-(--color-s-purple-taupe)' },
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
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const,
      }[row.getValue('status') as string]

      return h(
        UBadge,
        { size: 'xl', class: 'capitalize', variant: 'subtle', color },
        () => {
          const v = Object.entries(QRB_STATUS).find(
            ([key, value]) => row.getValue('status') === value,
          )

          return v ? v[0] : 'DISABLED'
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

  console.log(e)
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

const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
})

const columnFilters = ref([
  {
    id: 'name',
    value: '',
  },
])

const tableTotal: Ref<number | undefined> = computed(
  () => table.value?.tableApi?.getFilteredRowModel().rows.length,
)
</script>

<template>
  <div class="h-full qrb-table">
    <div class="h-full w-full flex flex-col justify-between space-y-4 pb-4">
      <div class="flex px-4 py-3.5 border-b border-accented">
        <UInput
            :model-value="table?.tableApi?.getColumn('name')?.getFilterValue() as string"
            size="xl"
            class="max-w-sm"
            placeholder="Filter names..."
            @update:model-value="table?.tableApi?.getColumn('name')?.setFilterValue($event)"
        />
      </div>
      <UTable
          ref="table"
          v-model:pagination="pagination"
          v-model:column-filters="columnFilters"
          :data="list"
          :columns="columns"
          :pagination-options="{
            getPaginationRowModel: getPaginationRowModel()
          }"
          :ui="{ td: 'text-xl', th: 'text-xl' }"
          class="flex-1"
      />

      <div class="px-4 py-3.5 text-md text-muted">
        {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
        {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
      </div>

      <div class="flex justify-center border-t border-default pt-4">
        <UPagination
            :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
            :items-per-page="table?.tableApi?.getState().pagination.pageSize"
            :total="tableTotal"
            @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>