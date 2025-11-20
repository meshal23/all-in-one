import { useForm } from "@tanstack/react-form";
import React, { type ChangeEvent } from "react";
import { useOutletContext } from "react-router";
import TextInput from "~/components/FormComponents/TextInput";
import AsyncSelect from "react-select/async";
import {
  loadItemBrandOptions,
  loadItemCategoryOptions,
} from "~/AsyncSelectOptions/loadOptions";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import type { CreateCustomerFormType } from "../types/CreateCustomerFormType";

const StepOne = () => {
  // the any type will be changed by the formdata type define by ts
  const { formData, setFormData } = useOutletContext<{
    formData: CreateCustomerFormType;
    setFormData: React.Dispatch<React.SetStateAction<CreateCustomerFormType>>;
  }>();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      nicNumber: "",
      notes: "",
      creditLimit: 0,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-3 px-4 mx-auto max-w-2xl lg:py-3 h-[400px] overflow-y-scroll">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new customer
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <form.Field
            name="firstName"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div className="sm:col-span-1">
                  <TextInput
                    id="name"
                    name={field.name}
                    value={formData.firstName}
                    onChange={(e) => {
                      // this only focuses on validation
                      field.handleChange(e.target.value);

                      // this is react router data coming in the
                      // outlet context
                      setFormData((prev: any) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                    required
                    title="First Name"
                    type="text"
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="lastName"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.lastName}
                    type="text"
                    id="last_name"
                    title="Last Name"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="nicNumber"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.nicNumber}
                    type="text"
                    id="nic_number"
                    title="NIC"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        nicNumber: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="creditLimit"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.creditLimit}
                    type="number"
                    id="credit_limit"
                    title="Credit Limit"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        creditLimit: e.target.value,
                      }));
                      field.handleChange(e.target.valueAsNumber);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="notes" validators={{ onChange: ({ value }) => {} }}>
            {(field) => {
              return (
                <div className="sm:col-span-2">
                  <label htmlFor=""></label>
                  <Textarea
                    name={field.name}
                    value={formData.notes}
                    title="Notes"
                    placeholder="Note..."
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        notes: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>
        </div>
      </div>
    </section>
  );
};

export default StepOne;
