import React from "react";
import { Form, Outlet, redirect, useOutletContext } from "react-router";
import TextInput from "~/components/FormComponents/TextInput";
import { Button } from "~/components/ui/button";
import type { Route } from "./+types/AddItemBrand";
import ItemCategoryService from "~/Services/ItemCategoryService/ItemCategoryService";
import { toast } from "sonner";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import ItemBrandService from "~/Services/ItemBrandService/ItemBrandService";

dayjs.extend(localizedFormat);

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  const brand = formData.get("brand");

  const data = {
    brand: brand,
  };

  if (brand == "") {
    return { error: "Item brand is required" };
  } else {
    const response = await ItemBrandService.create(data);
    console.log(response);
    toast("Item brand created", {
      description: `${dayjs().format("LLLL")}`,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });

    throw redirect("/item-brand");
  }
}

const AddItemBrand = ({ actionData }: Route.ComponentProps) => {
  const { openDialog, setOpenDialog } = useOutletContext<any>();

  // to check if the value is an empty string normally we use useState
  // but this is for only handle dialog so just useRef utilised
  const inputValueRef = React.useRef<HTMLInputElement>(null);
  const data = actionData;

  return (
    <div className="space-y-3 p-6 border rounded-lg w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Item Category</h2>
        <div className="flex items-center gap-2"></div>
      </div>
      <nav aria-label="Checkout Steps" className="group my-4">
        <ol
          className="flex items-center justify-between gap-2"
          aria-orientation="horizontal"
        ></ol>
      </nav>
      <Form method="post">
        <div>
          <TextInput
            ref={inputValueRef}
            onChange={() => console.log(inputValueRef.current?.value)}
            id="brand"
            name="brand"
            title="Item Brand"
            type="text"
            placeHolder="Add Item Brand..."
          />
          {data?.error && (
            <p
              className="motion-preset-shake text-red-500 "
              key={data?.error as string}
            >
              {data?.error}
            </p>
          )}
        </div>

        <div className="flex mt-3 justify-between gap-4">
          <Button
            type="submit"
            onClick={() => {
              inputValueRef.current?.value != ""
                ? setOpenDialog(false)
                : setOpenDialog(true);
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddItemBrand;
