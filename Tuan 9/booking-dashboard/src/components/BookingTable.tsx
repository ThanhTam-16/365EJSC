// src/components/BookingTable.tsx
import React from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import type { ColumnDef, SortingState } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import type { Booking } from '../data/bookings'


interface BookingTableProps {
  data: Booking[]
}

export function BookingTable({ data }: BookingTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [search, setSearch] = React.useState('')

  const filteredData = React.useMemo(() => {
    if (!search.trim()) return data

    const keyword = search.toLowerCase()

    return data.filter((b) => {
      return (
        b.id.toLowerCase().includes(keyword) ||
        b.customerName.toLowerCase().includes(keyword) ||
        b.fieldName.toLowerCase().includes(keyword)
      )
    })
  }, [data, search])

  const columns = React.useMemo<ColumnDef<Booking>[]>(
    () => [
      {
        header: 'Mã đơn',
        accessorKey: 'id',
        cell: (info) => {
          const booking = info.row.original
          return (
            <Link
              to="/bookings/$bookingId"
              params={{ bookingId: booking.id }}
              className="link"
            >
              {booking.id}
            </Link>
          )
        },
      },
      {
        header: 'Khách hàng',
        accessorKey: 'customerName',
      },
      {
        header: 'Sân',
        accessorKey: 'fieldName',
      },
      {
        header: 'Bắt đầu',
        accessorKey: 'startTime',
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleString('vi-VN'),
      },
      {
        header: 'Kết thúc',
        accessorKey: 'endTime',
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleString('vi-VN'),
      },
      {
        header: 'Trạng thái',
        accessorKey: 'status',
        cell: (info) => {
          const value = info.getValue() as Booking['status']
          return <StatusBadge status={value} />
        },
      },
      {
        header: 'Số tiền',
        accessorKey: 'amount',
        cell: (info) =>
          (info.getValue() as number).toLocaleString('vi-VN') + ' ₫',
      },
    ],
    [],
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="card">
      <div className="table-toolbar">
        <input
          className="input"
          placeholder="Tìm kiếm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="table-count">
          {filteredData.length} bookings
        </span>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const sortingState = header.column.getIsSorted()

                  return (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      className={canSort ? 'th th-sortable' : 'th'}
                    >
                      <div className="th-content">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {sortingState === 'asc' && <span>▲</span>}
                        {sortingState === 'desc' && <span>▼</span>}
                      </div>
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="td">
                    {flexRender(
                        cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="td-empty">
                  Không có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-pagination">
        <button
          className="btn"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Trang trước
        </button>
        <span>
          Trang {table.getState().pagination.pageIndex + 1} /{' '}
          {table.getPageCount() || 1}
        </span>
        <button
          className="btn"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Trang sau
        </button>
      </div>
    </div>
  )
}

interface StatusBadgeProps {
  status: Booking['status']
}

function StatusBadge({ status }: StatusBadgeProps) {
  const labelMap: Record<Booking['status'], string> = {
    pending: 'Đang chờ',
    confirmed: 'Đã xác nhận',
    canceled: 'Đã hủy',
  }

  return <span className={`badge badge-${status}`}>{labelMap[status]}</span>
}
