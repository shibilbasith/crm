"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CircleCheck,
  MoreVertical,
  GripVertical,
  Columns3,
  Loader,
  Plus,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
  Building,
  Calendar,
  DollarSign,
  Edit,
  Trash2,
  Eye,
  UserPlus,
} from "lucide-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customerSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  company: z.string(),
  location: z.string(),
  status: z.string(),
  value: z.number(),
  lastContact: z.string(),
  assignedTo: z.string(),
})

type Customer = z.infer<typeof customerSchema>

const initialData: Customer[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Corp",
    location: "New York, NY",
    status: "active",
    value: 2400,
    lastContact: "2024-12-06",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@designstudio.com",
    phone: "+1 (555) 234-5678",
    company: "Design Studio",
    location: "Los Angeles, CA",
    status: "pending",
    value: 1800,
    lastContact: "2024-11-29",
    assignedTo: "Assign manager",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike@marketinginc.com",
    phone: "+1 (555) 345-6789",
    company: "Marketing Inc",
    location: "Chicago, IL",
    status: "active",
    value: 3200,
    lastContact: "2024-12-03",
    assignedTo: "John Anderson",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@consultingllc.com",
    phone: "+1 (555) 456-7890",
    company: "Consulting LLC",
    location: "Austin, TX",
    status: "inactive",
    value: 950,
    lastContact: "2024-11-22",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 5,
    name: "David Wilson",
    email: "david@financegroup.com",
    phone: "+1 (555) 567-8901",
    company: "Finance Group",
    location: "Miami, FL",
    status: "active",
    value: 4500,
    lastContact: "2024-12-05",
    assignedTo: "John Anderson",
  },
  {
    id: 6,
    name: "Laura Thompson",
    email: "laura@techinnovators.com",
    phone: "+1 (555) 678-9012",
    company: "Tech Innovators",
    location: "Seattle, WA",
    status: "pending",
    value: 2750,
    lastContact: "2024-12-01",
    assignedTo: "Assign manager",
  },
  {
    id: 7,
    name: "James Miller",
    email: "james@logisticspro.com",
    phone: "+1 (555) 789-0123",
    company: "Logistics Pro",
    location: "Denver, CO",
    status: "active",
    value: 3900,
    lastContact: "2024-12-04",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 8,
    name: "Olivia Harris",
    email: "olivia@mediacreative.com",
    phone: "+1 (555) 890-1234",
    company: "Media Creative",
    location: "Boston, MA",
    status: "inactive",
    value: 800,
    lastContact: "2024-11-25",
    assignedTo: "John Anderson",
  },
  {
    id: 9,
    name: "Robert Martinez",
    email: "robert@greenenergy.com",
    phone: "+1 (555) 901-2345",
    company: "Green Energy",
    location: "San Francisco, CA",
    status: "active",
    value: 5100,
    lastContact: "2024-12-07",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 10,
    name: "Sophia Clark",
    email: "sophia@healthsolutions.com",
    phone: "+1 (555) 012-3456",
    company: "Health Solutions",
    location: "Portland, OR",
    status: "pending",
    value: 2100,
    lastContact: "2024-11-30",
    assignedTo: "Assign manager",
  },
  {
    id: 11,
    name: "William Turner",
    email: "william@buildright.com",
    phone: "+1 (555) 111-2222",
    company: "BuildRight",
    location: "Phoenix, AZ",
    status: "active",
    value: 3400,
    lastContact: "2024-12-02",
    assignedTo: "John Anderson",
  },
  {
    id: 12,
    name: "Ava Lewis",
    email: "ava@fashionhub.com",
    phone: "+1 (555) 222-3333",
    company: "Fashion Hub",
    location: "Las Vegas, NV",
    status: "inactive",
    value: 1200,
    lastContact: "2024-11-21",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 13,
    name: "Ethan Walker",
    email: "ethan@softwaregenius.com",
    phone: "+1 (555) 333-4444",
    company: "Software Genius",
    location: "San Diego, CA",
    status: "active",
    value: 4700,
    lastContact: "2024-12-06",
    assignedTo: "Assign manager",
  },
  {
    id: 14,
    name: "Mia Hall",
    email: "mia@eventplanners.com",
    phone: "+1 (555) 444-5555",
    company: "Event Planners",
    location: "Atlanta, GA",
    status: "pending",
    value: 1900,
    lastContact: "2024-11-28",
    assignedTo: "John Anderson",
  },
  {
    id: 15,
    name: "Benjamin Allen",
    email: "benjamin@foodiesdelight.com",
    phone: "+1 (555) 555-6666",
    company: "Foodies Delight",
    location: "Dallas, TX",
    status: "active",
    value: 3650,
    lastContact: "2024-12-03",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 16,
    name: "Charlotte Young",
    email: "charlotte@edusmart.com",
    phone: "+1 (555) 666-7777",
    company: "EduSmart",
    location: "Orlando, FL",
    status: "inactive",
    value: 950,
    lastContact: "2024-11-26",
    assignedTo: "Assign manager",
  },
  {
    id: 17,
    name: "Henry King",
    email: "henry@digitalworld.com",
    phone: "+1 (555) 777-8888",
    company: "Digital World",
    location: "Salt Lake City, UT",
    status: "active",
    value: 4200,
    lastContact: "2024-12-05",
    assignedTo: "John Anderson",
  },
  {
    id: 18,
    name: "Amelia Scott",
    email: "amelia@luxuryhomes.com",
    phone: "+1 (555) 888-9999",
    company: "Luxury Homes",
    location: "Charlotte, NC",
    status: "pending",
    value: 2800,
    lastContact: "2024-12-01",
    assignedTo: "Sarah Wilson",
  },
  {
    id: 19,
    name: "Daniel Wright",
    email: "daniel@autotech.com",
    phone: "+1 (555) 999-0000",
    company: "AutoTech",
    location: "Detroit, MI",
    status: "active",
    value: 3600,
    lastContact: "2024-12-04",
    assignedTo: "Assign manager",
  },
  {
    id: 20,
    name: "Harper Green",
    email: "harper@travelwise.com",
    phone: "+1 (555) 000-1111",
    company: "Travel Wise",
    location: "Nashville, TN",
    status: "inactive",
    value: 1100,
    lastContact: "2024-11-23",
    assignedTo: "John Anderson",
  },
]


// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<Customer>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      return <CustomerCellViewer customer={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.company}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.status === "active"
            ? "default"
            : row.original.status === "pending"
              ? "secondary"
              : "outline"
        }
        className="text-muted-foreground px-1.5"
      >
        {row.original.status === "active" ? (
          <CircleCheck className="w-3 h-3 mr-1 fill-green-500 dark:fill-green-400" />
        ) : (
          <Loader className="w-3 h-3 mr-1" />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "value",
    header: () => <div className="w-full text-right">Value</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
              loading: `Saving ${row.original.name}`,
              success: "Done",
              error: "Error",
            }
          )
        }}
      >
        <Label htmlFor={`${row.original.id}-value`} className="sr-only">
          Value
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-20 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={`$${row.original.value.toLocaleString()}`}
          id={`${row.original.id}-value`}
        />
      </form>
    ),
  },
  {
    accessorKey: "lastContact",
    header: () => <div className="w-full text-right">Last Contact</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1000)),
            {
              loading: `Saving ${row.original.name}`,
              success: "Done",
              error: "Error",
            }
          )
        }}
      >
        <Label htmlFor={`${row.original.id}-contact`} className="sr-only">
          Last Contact
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-24 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={new Date(row.original.lastContact).toLocaleDateString()}
          id={`${row.original.id}-contact`}
        />
      </form>
    ),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      const isAssigned = row.original.assignedTo !== "Assign manager"
      if (isAssigned) {
        return row.original.assignedTo
      }
      return (
        <>
          <Label htmlFor={`${row.original.id}-assigned`} className="sr-only">
            Assigned To
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-assigned`}
            >
              <SelectValue placeholder="Assign manager" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
              <SelectItem value="John Anderson">John Anderson</SelectItem>
              <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <MoreVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<Customer> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

function CustomersDataTable({
  data: initialCustomerData,
}: {
  data: Customer[]
}) {
  const [data, setData] = React.useState(() => initialCustomerData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <Tabs
      defaultValue="customers"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="customers">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="customers">All Customers</SelectItem>
            <SelectItem value="analytics">Analytics</SelectItem>
            <SelectItem value="segments">Customer Segments</SelectItem>
            <SelectItem value="reports">Reports</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="customers">All Customers</TabsTrigger>
          <TabsTrigger value="analytics">
            Analytics <Badge variant="secondary">12</Badge>
          </TabsTrigger>
          <TabsTrigger value="segments">
            Segments <Badge variant="secondary">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns3 />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Customer</span>
          </Button>
        </div>
      </div>

      <TabsContent
        value="customers"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent
        value="analytics"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
          <p className="text-muted-foreground">Customer Analytics Dashboard</p>
        </div>
      </TabsContent>

      <TabsContent value="segments" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
          <p className="text-muted-foreground">Customer Segments View</p>
        </div>
      </TabsContent>

      <TabsContent
        value="reports"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed flex items-center justify-center">
          <p className="text-muted-foreground">Customer Reports</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

const chartData = [
  { month: "January", revenue: 18600, customers: 80 },
  { month: "February", revenue: 30500, customers: 200 },
  { month: "March", revenue: 23700, customers: 120 },
  { month: "April", revenue: 7300, customers: 190 },
  { month: "May", revenue: 20900, customers: 130 },
  { month: "June", revenue: 21400, customers: 140 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
  customers: {
    label: "Customers",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function CustomerCellViewer({ customer }: { customer: Customer }) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left justify-start"
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-medium">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="font-medium text-sm">{customer.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {customer.email}
              </div>
            </div>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-w-md">
        <DrawerHeader className="gap-1">
          <DrawerTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-sm font-medium">
                {customer.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {customer.name}
          </DrawerTitle>
          <DrawerDescription>
            Customer details and interaction history
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 0,
                right: 10,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                hide
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Area
                dataKey="customers"
                type="natural"
                fill="var(--color-customers)"
                fillOpacity={0.6}
                stroke="var(--color-customers)"
                stackId="a"
              />
              <Area
                dataKey="revenue"
                type="natural"
                fill="var(--color-revenue)"
                fillOpacity={0.4}
                stroke="var(--color-revenue)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
          <Separator />
          <div className="grid gap-2">
            <div className="flex gap-2 leading-none font-medium">
              Customer value trending up by 15.2% this quarter{" "}
              <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Showing customer engagement and revenue data for the last 6 months.
              This customer has been consistently active with regular purchases.
            </div>
          </div>
          <Separator />
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={customer.name} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue={customer.company} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input id="email" defaultValue={customer.email} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input id="phone" defaultValue={customer.phone} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input id="location" defaultValue={customer.location} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={customer.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="value" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Customer Value
                </Label>
                <Input
                  id="value"
                  defaultValue={`$${customer.value.toLocaleString()}`}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="lastContact" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Last Contact
                </Label>
                <Input
                  id="lastContact"
                  type="date"
                  defaultValue={customer.lastContact}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="assignedTo" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Assigned To
                </Label>
                <Select defaultValue={customer.assignedTo}>
                  <SelectTrigger id="assignedTo" className="w-full">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sarah Wilson">Sarah Wilson</SelectItem>
                    <SelectItem value="John Anderson">John Anderson</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function CustomersPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships and contacts with advanced data table features.
            </p>
          </div>
        </div>
        <CustomersDataTable data={initialData} />
      </div>
    </LayoutWrapper>
  )
}