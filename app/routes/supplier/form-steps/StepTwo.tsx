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
import type { CreateSupplierFormType } from "../types/CreateSupplierFormType";

const StepTwo = () => {
  // the any type will be changed by the formdata type define by ts
  const { formData, setFormData } = useOutletContext<{
    formData: CreateSupplierFormType;
    setFormData: React.Dispatch<React.SetStateAction<CreateSupplierFormType>>;
  }>();
  const form = useForm({
    defaultValues: {
      phone1: "",
      phone2: "",
      email: "",
      address: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-3 px-4 mx-auto max-w-2xl lg:py-3 h-[400px] overflow-y-scroll">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <form.Field
            name="phone1"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div className="sm:col-span-1">
                  <TextInput
                    id="phone1"
                    name={field.name}
                    value={formData.phone1}
                    onChange={(e) => {
                      // this only focuses on validation
                      field.handleChange(e.target.value);

                      // this is react router data coming in the
                      // outlet context
                      setFormData((prev: any) => ({
                        ...prev,
                        phone1: e.target.value,
                      }));
                    }}
                    required
                    title="Phone No(1)"
                    type="tel"
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="phone2"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.phone2}
                    type="tel"
                    id="phone2"
                    title="Phone No(2)"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        phone2: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field name="email" validators={{ onChange: ({ value }) => {} }}>
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.email}
                    type="text"
                    id="email"
                    title="Email"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        email: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="address"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.address}
                    type="text"
                    id="address"
                    title="Address"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        address: e.target.value,
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

export default StepTwo;
