import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Form, useNavigate } from "react-router";
import TableSkeleton from "../main/TableSkeleton";
import type { Route } from "../../routes/products/+types/TheProduct";
import { Separator } from "../ui/separator";

// export async function clientLoader({ request }: Route.ClientLoaderArgs) {
//   const url = new URL(request.url);
//   const search = url.searchParams.get("search");

// }

export function DataTable({
  data,
  columns,
  searchPlaceholder,
  searchColumn,
  nextPageUrl,
  nextCursor,
  prevPageUrl,
  prevCursor,
  search,
  setSearch,
}: {
  data: any;
  columns: ColumnDef<any>[];
  searchPlaceholder?: string;
  searchColumn: string;
  nextPageUrl: string;
  nextCursor: string;
  prevPageUrl: string;
  prevCursor: string;
  search?: string;
  setSearch?: any;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const navigate = useNavigate();
  const searchParamValue = new URLSearchParams(document.location.search).get(
    "search"
  );
  console.log(searchParamValue);

  return (
    <div className="w-full">
      <div className="block sm:flex items-center py-4">
        <Form method="get" role="search" className="flex gap-2">
          <Input
            placeholder={searchPlaceholder}
            name="search"
            id="search"
            type="search"
            // value={
            //   (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            // }
            // onChange={(event) =>
            //   table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            // }
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="max-w-sm"
          />
          <Button type="submit" className="block sm:hidden">
            Submit
          </Button>
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-600"
            onClick={(event) => setSearch("")}
          >
            Clear
          </Button>
        </Form>

        <Separator className="text-blue-900 mt-3 w-1/4 block sm:hidden" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto mt-2">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <TableSkeleton />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage();
              if (prevPageUrl) {
                const cursor = prevCursor;
                window.history.pushState({}, "", `?cursor=${cursor}`);
                navigate(`?cursor=${prevCursor}`);
              }
            }}
            disabled={!prevCursor}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage();
              if (nextPageUrl) {
                const cursor = nextCursor;
                window.history.pushState({}, "", `?cursor=${cursor}`);
                navigate(`?cursor=${nextCursor}`);
              }
            }}
            disabled={!nextCursor}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
