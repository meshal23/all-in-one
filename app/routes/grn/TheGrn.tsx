import { MoreHorizontal, HousePlus } from "lucide-react";
import React from "react";
import Searchbar from "~/components/main/Searchbar";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Await, Outlet, useNavigate, useSearchParams } from "react-router";
import { DataTable } from "~/components/FormComponents/DataTable";
import type { Route } from "./+types/TheGrn";

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
import { Toaster } from "sonner";
import type { Grn } from "./types/Grn";
import SupplierService from "~/Services/SupplierService/SupplierService";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const search = url.searchParams.get("search");

  let data = null;

  if (search == null || search == "") {
    data = await SupplierService.getSupplierPaginated(cursor);
  } else if (search.length >= 3) {
    data = await SupplierService.search(search);
  }

  return { data };
}

// const columns: ColumnDef<Grn>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },

//   {
//     accessorKey: "code",
//     header: "Code",
//     cell: ({ row }) => <div className="capitalize">{row.getValue("code")}</div>,
//   },

//   {
//     accessorKey: "name",
//     header: "Supplier Name",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("name") ?? "-"}</div>
//     ),
//   },

//   {
//     accessorKey: "phone1",
//     header: "Phone No(1)",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("phone1") ?? "-"}</div>
//     ),
//   },

//   {
//     accessorKey: "nicNumber",
//     header: "NIC",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("nicNumber") ?? "-"}</div>
//     ),
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const payment = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//             // onClick={() => navigator.clipboard.writeText(payment.code)}
//             >
//               Copy payment ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View customer</DropdownMenuItem>
//             <DropdownMenuItem>View payment details</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

const TheGrn = ({ loaderData }: Route.ComponentProps) => {
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

  const [openDialog, setOpenDialog] = React.useState(false);

  console.log(nextPageUrl);

  const navigate = useNavigate();

  const [search, setSearch] = React.useState("");
  console.log(search);

  // const tableData: Grn[] = data?.map((item: Grn) => {
  //   return {
  //     code: item?.code,
  //     name: item?.name,
  //     phone1: item?.phone1,
  //     nicNumber: item?.nic_number,
  //   };
  // });

  return (
    <section className="w-full flex flex-col mt-[2rem] min-h-screen">
      <Toaster position="top-center" />
      <div className="flex min-w-full justify-between">
        {/* <Searchbar /> */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger onClick={() => navigate("add-grn/step-1")}>
            <button
              type="button"
              className="px-5 py-2 text-base font-medium text-center inline-flex gap-1 items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <HousePlus />
              <span>Create Grn</span>
            </button>
          </DialogTrigger>
          <DialogContent className="min-w-2/4">
            <Outlet context={{ openDialog, setOpenDialog }} />
          </DialogContent>
        </Dialog>
      </div>
      {/* <React.Suspense fallback={<TableSkeleton />}>
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
      </React.Suspense> */}

      {/* </div> */}
    </section>
  );
};

export default TheGrn;
