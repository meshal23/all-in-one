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

const StepOne = () => {
  // the any type will be changed by the formdata type define by ts
  const { formData, setFormData } = useOutletContext<{
    formData: CreateProductFormType;
    setFormData: React.Dispatch<React.SetStateAction<CreateProductFormType>>;
  }>();
  const form = useForm({
    defaultValues: {
      brandCode: "",
      categoryCode: "",
      name: "",
      minStock: 0,
      maxStock: 0,
      isBatch: 1,
      isActive: 1,
      itemType: "product",
      image: "",
      description: "",
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
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <form.Field name="name" validators={{ onChange: ({ value }) => {} }}>
            {(field) => {
              return (
                <div className="sm:col-span-1">
                  <TextInput
                    id="name"
                    name={field.name}
                    value={formData.name}
                    onChange={(e) => {
                      // this only focuses on validation
                      field.handleChange(e.target.value);

                      // this is react router data coming in the
                      // outlet context
                      setFormData((prev: any) => ({
                        ...prev,
                        name: e.target.value,
                      }));
                    }}
                    required
                    title="Item Name"
                    type="text"
                    placeHolder="Enter Item"
                  />
                </div>
              );
            }}
          </form.Field>

          {/* this is react-select */}
          <form.Field name="categoryCode" validators={{ onChange: () => {} }}>
            {(field) => {
              return (
                <div className="">
                  <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Category
                  </p>
                  <AsyncSelect
                    defaultOptions
                    isClearable
                    name={field.name}
                    loadOptions={loadItemCategoryOptions}
                    placeholder="Select Category"
                    isSearchable={false}
                    value={formData.categoryCode}
                    onChange={(selectedOption: any) => {
                      field.handleChange(selectedOption);
                      setFormData((prev: any) => ({
                        ...prev,
                        categoryCode: {
                          value: selectedOption.value,
                          label: selectedOption.label,
                        },
                      }));
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          {/* this is react-select */}
          <form.Field name="brandCode" validators={{ onChange: () => {} }}>
            {(field) => {
              return (
                <div className="w-full">
                  <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Brand
                  </p>
                  <AsyncSelect
                    defaultOptions
                    isClearable
                    name={field.name}
                    loadOptions={loadItemBrandOptions}
                    placeholder="Select Brand"
                    isSearchable={false}
                    value={formData.brandCode}
                    onChange={(selectedOption: any) => {
                      field.handleChange(selectedOption);
                      setFormData((prev: any) => ({
                        ...prev,
                        brandCode: {
                          value: selectedOption.value,
                          label: selectedOption.label,
                        },
                      }));
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="minStock"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.minStock}
                    type="number"
                    id="min_Stock"
                    title="Min Stock"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        minStock: e.target.value,
                      }));
                      field.handleChange(e.target.valueAsNumber);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="maxStock"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div>
                  <TextInput
                    name={field.name}
                    value={formData.maxStock}
                    type="number"
                    id="max_Stock"
                    title="Max Stock"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        maxStock: e.target.value,
                      }));
                      field.handleChange(e.target.valueAsNumber);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>

          <form.Field
            name="description"
            validators={{ onChange: ({ value }) => {} }}
          >
            {(field) => {
              return (
                <div className="sm:col-span-2">
                  <label htmlFor=""></label>
                  <Textarea
                    name={field.name}
                    value={formData.description}
                    title="Description"
                    placeholder="Description"
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                      field.handleChange(e.target.value);
                    }}
                  />
                </div>
              );
            }}
          </form.Field>
        </div>
        <div className="mt-8 flex gap-5">
          <form.Field name="itemType" validators={{ onChange: () => {} }}>
            {(field) => {
              return (
                <div className="flex gap-2 items-center mb-4">
                  {/* <label
                    htmlFor="product"
                    className="ms-2 disabled:hidden text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    <input
                      id="product"
                      type="checkbox"
                      name={field.name}
                      value={formData.itemType}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFormData((prev: any) => ({
                          ...prev,
                          itemType: "product",
                        }));
                        field.handleChange(e.target.value);
                      }}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </label>
                  <span className="ms-2 disabled:text-slate-300 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Product
                  </span> */}
                  <Switch
                    name={field.name}
                    value={formData.itemType}
                    checked={formData.itemType == "product"}
                    disabled={formData.itemType == "service"}
                    onCheckedChange={(checked) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        itemType: checked ? "product" : "",
                      }));
                    }}
                    id="product"
                  />
                  <Label htmlFor="product">Product</Label>
                </div>
              );
            }}
          </form.Field>

          <form.Field name="itemType" validators={{ onChange: () => {} }}>
            {(field) => {
              return (
                <div className="flex gap-2 items-center mb-4">
                  {/* <input
                    id="service"
                    type="checkbox"
                    name={field.name}
                    value={formData.itemType}
                    onChange={(e) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        itemType: "service",
                      }));
                      field.handleChange(e.target.value);
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="service"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Service
                  </label> */}
                  <Switch
                    name={field.name}
                    value={formData.itemType}
                    checked={formData.itemType == "service"}
                    disabled={formData.itemType == "product"}
                    onCheckedChange={(checked) => {
                      console.log(checked);

                      setFormData((prev: any) => ({
                        ...prev,
                        itemType: checked ? "service" : "",
                      }));
                    }}
                    id="service"
                  />
                  <Label htmlFor="service">Service</Label>
                </div>
              );
            }}
          </form.Field>
          <form.Field name="isBatch" validators={{ onChange: () => {} }}>
            {(field) => {
              return (
                <div className="flex gap-2 items-center mb-4">
                  {/* <input
                    id="default-checkbox"
                    type="checkbox"
                    name={field.name}
                    value={1}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-checkbox"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Batch Enable
                  </label> */}
                  <Switch
                    name={field.name}
                    value={formData.isBatch}
                    checked={formData.isBatch == 1}
                    onCheckedChange={(checked) => {
                      setFormData((prev: any) => ({
                        ...prev,
                        isBatch: checked ? 1 : 0,
                      }));
                    }}
                    id="batch"
                  />
                  <Label htmlFor="batch">Batch Enable</Label>
                </div>
              );
            }}
          </form.Field>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        >
          Add product
        </button>
      </div>
    </section>
  );
};

export default StepOne;
