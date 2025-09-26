import { useForm } from "@tanstack/react-form";
import React from "react";
import { useOutletContext } from "react-router";
import TextInput from "~/components/FormComponents/TextInput";

const StepTwo = () => {
  const { formData, setFormData } = useOutletContext<{
    formData: CreateProductFormType;
    setFormData: React.Dispatch<React.SetStateAction<CreateProductFormType>>;
  }>();
  const form = useForm({
    defaultValues: {
      costPrice: 0,
      retailPrice: 0,
      discountAmount: 0,
      discountPercent: 0,
    },
  });
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="costPrice"
          validators={{ onChange: ({ value }) => {} }}
        >
          {(field) => {
            return (
              <div className="grid gap-2">
                <TextInput
                  name={field.name}
                  title="Cost Price"
                  type="number"
                  value={formData.costPrice}
                  id="cost_price"
                  onChange={(e) => {
                    setFormData((prev: any) => ({
                      ...prev,
                      costPrice: e.target.value,
                    }));
                    field.handleChange(e.target.valueAsNumber);
                  }}
                />
              </div>
            );
          }}
        </form.Field>

        <form.Field
          name="retailPrice"
          validators={{ onChange: ({ value }) => {} }}
        >
          {(field) => {
            return (
              <div className="grid gap-2">
                <TextInput
                  name={field.name}
                  value={formData.retailPrice}
                  title="Retail Price"
                  type="number"
                  id="retail_price"
                  onChange={(e) => {
                    setFormData((prev: any) => ({
                      ...prev,
                      retailPrice: e.target.value,
                    }));
                    field.handleChange(e.target.valueAsNumber);
                  }}
                />
              </div>
            );
          }}
        </form.Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field name="discountPercent" validators={{ onChange: () => {} }}>
          {(field) => {
            return (
              <div className="grid gap-2">
                <TextInput
                  name={field.name}
                  value={formData.discountPercent}
                  id="discount_percent"
                  title="Discount Percent"
                  type="number"
                  onChange={(e) => {
                    setFormData((prev: any) => ({
                      ...prev,
                      discountPercent: e.target.value,
                    }));
                    field.handleChange(e.target.valueAsNumber);
                  }}
                />
              </div>
            );
          }}
        </form.Field>

        <form.Field name="discountAmount" validators={{ onChange: () => {} }}>
          {(field) => {
            return (
              <div className="grid gap-2">
                <TextInput
                  name={field.name}
                  value={formData.discountAmount}
                  id="discount_amount"
                  title="Discount Amount"
                  type="number"
                  onChange={(e) => {
                    setFormData((prev: any) => ({
                      ...prev,
                      discountAmount: e.target.value,
                    }));
                    field.handleChange(e.target.valueAsNumber);
                  }}
                />
              </div>
            );
          }}
        </form.Field>
      </div>
    </div>
  );
};

export default StepTwo;
