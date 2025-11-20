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

const StepTwo = () => {
  // the any type will be changed by the formdata type define by ts
  const { formData, setFormData } = useOutletContext<{
    formData: CreateCustomerFormType;
    setFormData: React.Dispatch<React.SetStateAction<CreateCustomerFormType>>;
  }>();
  const form = useForm({
    defaultValues: {
      address: "",
      email: "",
      phone: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });
  const [selectedCategory, setSelectedCategory] = React.useState({
    value: null,
    label: "select category...",
  });
  const [selectedBrand, setSelectedBrand] = React.useState({
    value: null,
    label: "select brand...",
  });

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-3 px-4 mx-auto max-w-2xl lg:py-3 h-[400px] overflow-y-scroll">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <form.Field
            name="address"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div className="sm:col-span-1">
                  <TextInput
                    id="address"
                    name={field.name}
                    value={formData.address}
                    onChange={(e) => {
                      // this only focuses on validation
                      field.handleChange(e.target.value);

                      // this is react router data coming in the
                      // outlet context
                      setFormData((prev: any) => ({
                        ...prev,
                        address: e.target.value,
                      }));
                    }}
                    required
                    title="Address"
                    type="text"
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

          <form.Field name="phone" validators={{ onChange: ({ value }) => {} }}>
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.phone}
                    type="text"
                    id="phone"
                    title="Phone No"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        phone: e.target.value,
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
