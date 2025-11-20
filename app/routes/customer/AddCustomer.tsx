import React, { useState } from "react";
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useRevalidator,
  useSubmit,
} from "react-router";
import { defineStepper } from "@stepperize/react";
import { Button } from "~/components/ui/button";
import { Contact, ImageUp, PackagePlus, User, Wallet } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import axiosInstance from "~/lib/axios";
import ItemMasterService from "~/Services/ItemMasterService/ItemMasterService";

import type { CreateCustomerFormType } from "./types/CreateCustomerFormType";
import CustomerService from "~/Services/CustomerService/CustomerService";

const { useStepper, steps, utils } = defineStepper(
  {
    step_no: 1,
    id: "customer_info",
    title: "Customer Information",
    description: "Enter your customer information",
  },
  {
    step_no: 2,
    id: "contact_info",
    title: "Contact Information",
    description: "Enter your contact information",
  }
);

const AddCustomer = () => {
  const { openDialog, setOpenDialog } = useOutletContext<any>();
  const submit = useSubmit();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [formData, setFormData] = useState<CreateCustomerFormType>({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    nicNumber: "",
    phone: "",
    creditLimit: 0,
    notes: "",
  });

  const stepper = useStepper();
  const [isStepComplete, setIsStepComplete] = React.useState(false);
  const currentIndex = utils.getIndex(stepper.current.id);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await CustomerService.create(formData);
    revalidator.revalidate();
    console.log(revalidator);

    console.log(res);
  };
  return (
    <div className="space-y-3 p-0 sm:p-6  border rounded-lg w-full">
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
                  {step.id == "customer_info" && !isStepComplete ? (
                    <User />
                  ) : (
                    step.id == "contact_info" && !isStepComplete && <Contact />
                  )}
                </Button>
                <span className="text-sm font-medium hidden sm:block">
                  {step.title}
                </span>
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

          <Button
            type="submit"
            onClick={(e: any) => {
              handleSubmit(e);
              setOpenDialog(false);
            }}
          >
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default AddCustomer;
