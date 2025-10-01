import React, { useState } from "react";
import { Outlet, useNavigate, useSubmit } from "react-router";
import { defineStepper } from "@stepperize/react";
import { Button } from "~/components/ui/button";
import { ImageUp, PackagePlus, Wallet } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import axiosInstance from "~/lib/axios";
import ItemMasterService from "~/Services/ItemMasterService/ItemMasterService";
import type { CreateProductFormType } from "./ProductType/ProductFormType";

const { useStepper, steps, utils } = defineStepper(
  {
    step_no: 1,
    id: "prod_description",
    title: "Product Description",
    description: "Enter your product description",
  },
  {
    step_no: 2,
    id: "prod_pricing",
    title: "Pricing",
    description: "Enter your ricing details",
  },
  {
    step_no: 3,
    id: "img_upload",
    title: "Upload Image",
    description: "Upload Image",
  }
);

const AddProduct = () => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateProductFormType>({
    brandCode: { value: "", label: "select category..." },
    categoryCode: { value: "", label: "select brand..." },
    name: "",
    minStock: 0,
    maxStock: 0,
    costPrice: 0,
    retailPrice: 0,
    discountAmount: 0,
    discountPercent: 0,
    isBatch: 1,
    isActive: 1,
    itemType: "product",
    image: "",
    description: "",
  });

  const stepper = useStepper();
  const [isStepComplete, setIsStepComplete] = React.useState(false);
  const currentIndex = utils.getIndex(stepper.current.id);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const itemData = new FormData();

    itemData.append("name", formData.name);
    itemData.append("brandCode", formData.brandCode.value);
    itemData.append("categoryCode", formData.categoryCode.value);
    itemData.append("minStock", formData.minStock.toString());
    itemData.append("maxStock", formData.maxStock.toString());
    itemData.append("costPrice", formData.costPrice.toString());
    itemData.append("retailPrice", formData.retailPrice.toString());
    itemData.append("discountPercent", formData.discountPercent.toString());
    itemData.append("discountAmount", formData.discountAmount.toString());
    itemData.append("itemType", formData.itemType);
    itemData.append("isBatch", formData.isBatch ? "1" : "0");
    itemData.append("isActive", formData.isActive ? "1" : "0");
    itemData.append("image", formData.image);
    itemData.append("description", formData.description);

    const res = await ItemMasterService.create(itemData);

    console.log(res);
    console.log(formData);
  };
  return (
    <div className="space-y-3 p-6 border rounded-lg w-full">
      <div className="flex justify-between">
        <h2 className="text-lg font-medium">Checkout</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <div />
        </div>
      </div>
      <nav aria-label="Checkout Steps" className="group my-4">
        <ol
          className="flex items-center justify-between gap-2"
          aria-orientation="horizontal"
        >
          {stepper.all.map((step, index, array) => (
            <React.Fragment key={step.id}>
              <li className="flex items-center gap-4 flex-shrink-0">
                <Button
                  type="button"
                  role="tab"
                  variant={index <= currentIndex ? "default" : "secondary"}
                  aria-current={
                    stepper.current.id === step.id ? "step" : undefined
                  }
                  aria-posinset={index + 1}
                  aria-setsize={steps.length}
                  aria-selected={stepper.current.id === step.id}
                  className="flex size-10 items-center justify-center rounded-full"
                  onClick={() => {
                    stepper.goTo(step.id);
                  }}
                >
                  {step.id == "prod_description" && !isStepComplete ? (
                    <PackagePlus />
                  ) : step.id == "prod_pricing" && !isStepComplete ? (
                    <Wallet />
                  ) : (
                    <ImageUp />
                  )}
                </Button>
                <span className="text-sm font-medium">{step.title}</span>
              </li>
              {index < array.length - 1 && (
                <Separator
                  className={`flex-1 ${
                    index < currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </ol>
      </nav>

      <div>
        <Outlet context={{ formData, setFormData }} />
      </div>

      {!stepper.isLast ? (
        <div className="flex justify-end gap-4">
          <Button
            variant="secondary"
            type="button"
            onClick={() => {
              stepper.prev();
              navigate(`step-${stepper.current.step_no - 1}`);
            }}
            disabled={stepper.isFirst}
          >
            Back
          </Button>
          <Button
            type="button"
            onClick={() => {
              stepper.next();
              // console.log(stepper.current.step_no + 1);

              navigate(`step-${stepper.current.step_no + 1}`);
            }}
          >
            {stepper.isLast ? "Complete" : "Next"}
          </Button>
        </div>
      ) : (
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            onClick={() => {
              stepper.reset();
              navigate(`step-1`);
            }}
          >
            Reset
          </Button>

          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
