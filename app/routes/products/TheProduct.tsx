import { ImagePlus, MoreHorizontal } from "lucide-react";
import React from "react";
import Searchbar from "~/components/main/Searchbar";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Await, Outlet, useNavigate, useSearchParams } from "react-router";
import { DataTable } from "~/components/FormComponents/DataTable";
import type { Route } from "./+types/TheProduct";
import ItemMasterService from "~/Services/ItemMasterService/ItemMasterService";
import type { ShowProductType } from "./types/ShowProductType";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import TableSkeleton from "~/components/main/TableSkeleton";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const search = url.searchParams.get("search");

  let data = null;

  if (search == null || search == "") {
    data = await ItemMasterService.getAll(cursor);
  } else if (search.length == 3) {
    data = await ItemMasterService.search(search);
  }

  return { data };
}

const columns: ColumnDef<ShowProductType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    accessorKey: "costPrice",
    header: "Cost Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("costPrice")}</div>
    ),
  },

  {
    accessorKey: "retailPrice",
    header: "Retial Price",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("retailPrice")}</div>
    ),
  },
  {
    accessorKey: "isBatch",
    header: "Batch Enable",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("isBatch")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.code)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const TheProduct = ({ loaderData }: Route.ComponentProps) => {
  const isSearchValueEmpty =
    new URLSearchParams(document.location.search).get("search") !== "";

  const isSearchValueExist =
    new URLSearchParams(document.location.search).get("search") !== null;

  const { data } = isSearchValueEmpty
    ? isSearchValueExist
      ? loaderData
      : loaderData?.data
    : loaderData?.data;
  const nextPageUrl = loaderData.data?.next_page_url;
  const nextCursor = loaderData.data?.next_cursor;
  const prevPageUrl = loaderData.data?.prev_page_url;
  const prevCursor = loaderData.data?.prev_cursor;

  console.log(nextPageUrl);

  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  console.log(search);

  const tableData: ShowProductType[] = data?.map((item: ShowProductType) => {
    return {
      code: item?.code,
      name: item?.name,
      costPrice: item?.cost_price,
      retailPrice: item?.retail_price,
      isBatch: item?.is_batch == 1 ? "B" : "N/B",
    };
  });

  return (
    <section className="w-full flex flex-col mt-[2rem] min-h-screen">
      <div className="flex min-w-full justify-between">
        {/* <Searchbar /> */}
        <Dialog>
          <DialogTrigger onClick={() => navigate("add-product/step-1")}>
            <button
              type="button"
              className="px-5 py-2 text-base font-medium text-center inline-flex gap-1 items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <ImagePlus />
              <span>Create Item</span>
            </button>
          </DialogTrigger>
          <DialogContent className="min-w-2/4">
            <Outlet />
          </DialogContent>
        </Dialog>
      </div>
      <React.Suspense fallback={<TableSkeleton />}>
        <Await resolve={tableData}>
          <DataTable
            data={tableData}
            columns={columns}
            searchPlaceholder="Search By Item..."
            searchColumn="name"
            nextPageUrl={nextPageUrl}
            nextCursor={nextCursor}
            prevPageUrl={prevPageUrl}
            prevCursor={prevCursor}
            search={search}
            setSearch={setSearch}
          />
        </Await>
      </React.Suspense>

      {/* </div> */}
    </section>
  );
};

export default TheProduct;
