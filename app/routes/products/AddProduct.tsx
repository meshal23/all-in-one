import * as React from "react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";
import { Textarea } from "../../components/ui/textarea";
import { defineStepper } from "@stepperize/react";

import { PackagePlus } from "lucide-react";
import { Wallet } from "lucide-react";
import { ImageUp } from "lucide-react";
import { CircleCheckBig } from "lucide-react";
import {
  FormApi,
  formOptions,
  mergeForm,
  useForm,
  useTransform,
} from "@tanstack/react-form";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/remix";
import { Form } from "react-router";
import type { Route } from "./+types/AddProduct";
import TextInput from "~/components/FormComponents/TextInput";
import AsyncSelect from "react-select/async";
import {
  loadItemBrandOptions,
  loadItemCategoryOptions,
} from "~/AsyncSelectOptions/loadOptions";
import axiosInstance from "~/lib/axios";

const formOpts = formOptions({
  defaultValues: {
    brandCode: "",
    categoryCode: "",
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
  },
});

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    console.log("Server submitted data: ", value);
  },
  onSubmit: ({ value }) => {
    console.log("Server submitted data: ", value);
  },
});

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();

  try {
    const validatedData = await serverValidate(formData);
    console.log(validatedData);

    // const itemName = formData.get("name") as string;
    // const brandCode = formData.get("brandCode") as any;
    // const categoryCode = formData.get("categoryCode") as any;
    // const minStock = formData.get("minStock") as any;
    // const maxStock = formData.get("maxStock") as any;
    // const costPrice = formData.get("costPrice") as any;
    // const retailPrice = formData.get("retailPrice") as any;
    // const discountAmount = formData.get("discountAmount") as any;
    // const discountPercent = formData.get("discountPercent") as any;
    // const isBatch = formData.get("isBatch") as any;
    // const isActive = formData.get("isActive") as any;
    // const itemType = formData.get("itemType") as any;
    // const image = formData.get("image") as any;
    // const description = formData.get("description") as string;

    // const itemData = new FormData();

    // itemData.append("name", itemName);
    // itemData.append("brandCode", brandCode);
    // itemData.append("categoryCode", categoryCode);
    // itemData.append("minStock", minStock);
    // itemData.append("maxStock", maxStock);
    // itemData.append("costPrice", costPrice);
    // itemData.append("retailPrice", retailPrice);
    // itemData.append("discountAmount", discountAmount);
    // itemData.append("discountPercent", discountPercent);
    // itemData.append("isBatch", isBatch);
    // itemData.append("isActive", isActive);
    // itemData.append("itemType", itemType);
    // itemData.append("image", image);
    // itemData.append("description", description);

    // console.log(Object.fromEntries(itemData.entries()));

    // return itemData;
  } catch (e) {
    if (e instanceof ServerValidateError) {
      console.log(e);
      return e.formState;
    }

    const error = e instanceof Error ? e.message : String(e);
    throw error;
  }
}

const { useStepper, steps, utils } = defineStepper(
  {
    id: "prod_description",
    title: "Product Description",
    description: "Enter your product description",
  },
  {
    id: "prod_pricing",
    title: "Pricing",
    description: "Enter your ricing details",
  },
  { id: "img_upload", title: "Upload Image", description: "Upload Image" }
);

function AddProduct({ actionData }: Route.ComponentProps) {
  const data = actionData;
  console.log("Item data: ", data);

  const stepper = useStepper();
  const [isStepComplete, setIsStepComplete] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState({
    value: null,
    label: "select category...",
  });
  const [selectedBrand, setSelectedBrand] = React.useState({
    value: null,
    label: "select brand...",
  });
  const [previewImg, setPreviewImage] = React.useState<string | any>(null);
  const [imgFile, setImgFile] = React.useState<any>(null);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target as any).files[0];
    form.setFieldValue("image", file.name);
    setImgFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }

    // return URL.revokeObjectURL(imageUrl);
  };

  const form = useForm({
    ...formOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, data ?? {}),
      [data]
    ),
    onSubmit: ({ value }) => {
      const itemData = console.log("Submitted item data:", value);
    },
  });

  React.useEffect(() => {
    let objectUrl: string | null = null;

    if (imgFile) {
      objectUrl = URL.createObjectURL(imgFile);
      setPreviewImage(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imgFile]);

  // console.log(form.getFieldValue("itemType"));

  const currentIndex = utils.getIndex(stepper.current.id);
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
                  {isStepComplete && <CircleCheckBig />}
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
      <Form
        encType="multipart/form-data"
        method="post"
        onSubmit={() => form.handleSubmit()}
      >
        <div className="space-y-4">
          {stepper.switch({
            prod_description: () => {
              return (
                <section className="bg-white dark:bg-gray-900">
                  <div className="py-3 px-4 mx-auto max-w-2xl lg:py-3 h-[400px] overflow-y-scroll">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                      Add a new product
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <form.Field
                        name="name"
                        validators={{ onChange: ({ value }) => {} }}
                      >
                        {(field) => {
                          return (
                            <div className="sm:col-span-1">
                              <TextInput
                                id="name"
                                name={field.name}
                                value={field.state.value}
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
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
                      <form.Field
                        name="categoryCode"
                        validators={{ onChange: () => {} }}
                      >
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
                                value={selectedCategory}
                                onChange={(selectedOption: any) => {
                                  console.log(
                                    // selectedOption,
                                    field.state.value
                                  );
                                  setSelectedCategory({
                                    value: selectedOption.value,
                                    label: selectedOption.label,
                                  });
                                  field.handleChange(selectedOption);
                                  form.setFieldValue(
                                    "categoryCode",
                                    selectedOption.value
                                  );
                                }}
                              />
                            </div>
                          );
                        }}
                      </form.Field>

                      {/* this is react-select */}
                      <form.Field
                        name="brandCode"
                        validators={{ onChange: () => {} }}
                      >
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
                                value={selectedBrand}
                                onChange={(selectedOption: any) => {
                                  setSelectedBrand({
                                    value: selectedOption.value,
                                    label: selectedOption.label,
                                  });
                                  field.handleChange(selectedOption);
                                  form.setFieldValue(
                                    "brandCode",
                                    selectedOption.value
                                  );
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
                                value={field.state.value}
                                type="number"
                                id="min_Stock"
                                title="Min Stock"
                                onChange={(e) =>
                                  field.handleChange(e.target.valueAsNumber)
                                }
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
                                value={field.state.value}
                                type="number"
                                id="max_Stock"
                                title="Max Stock"
                                onChange={(e) =>
                                  field.handleChange(e.target.valueAsNumber)
                                }
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
                                value={field.state.value}
                                title="Description"
                                placeholder="Description"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                              />
                            </div>
                          );
                        }}
                      </form.Field>
                    </div>
                    <div className="mt-8 flex gap-5">
                      <form.Field
                        name="itemType"
                        validators={{ onChange: () => {} }}
                      >
                        {(field) => {
                          return (
                            <div className="flex items-center mb-4">
                              <input
                                id="product"
                                type="checkbox"
                                name={field.name}
                                value="product"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="product"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Product
                              </label>
                            </div>
                          );
                        }}
                      </form.Field>

                      <form.Field
                        name="itemType"
                        validators={{ onChange: () => {} }}
                      >
                        {(field) => {
                          return (
                            <div className="flex items-center mb-4">
                              <input
                                id="service"
                                type="checkbox"
                                name={field.name}
                                value="service"
                                onChange={(e) =>
                                  field.handleChange(e.target.value)
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="service"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Service
                              </label>
                            </div>
                          );
                        }}
                      </form.Field>
                      <form.Field
                        name="isBatch"
                        validators={{ onChange: () => {} }}
                      >
                        {(field) => {
                          return (
                            <div className="flex items-center mb-4">
                              <input
                                id="default-checkbox"
                                type="checkbox"
                                name={field.name}
                                value={1}
                                onChange={(e) =>
                                  field.handleChange(e.target.valueAsNumber)
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor="default-checkbox"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Batch Enable
                              </label>
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
            },
            prod_pricing: () => {
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
                              value={field.state.value}
                              id="cost_price"
                              onChange={(e) =>
                                field.handleChange(e.target.valueAsNumber)
                              }
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
                              value={field.state.value}
                              title="Retail Price"
                              type="number"
                              id="retail_price"
                              onChange={(e) =>
                                field.handleChange(e.target.valueAsNumber)
                              }
                            />
                          </div>
                        );
                      }}
                    </form.Field>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <form.Field
                      name="discountPercent"
                      validators={{ onChange: () => {} }}
                    >
                      {(field) => {
                        return (
                          <div className="grid gap-2">
                            <TextInput
                              name={field.name}
                              value={field.state.value}
                              id="discount_percent"
                              title="Discount Percent"
                              type="number"
                              onChange={(e) =>
                                field.handleChange(e.target.valueAsNumber)
                              }
                            />
                          </div>
                        );
                      }}
                    </form.Field>

                    <form.Field
                      name="discountAmount"
                      validators={{ onChange: () => {} }}
                    >
                      {(field) => {
                        return (
                          <div className="grid gap-2">
                            <TextInput
                              name={field.name}
                              value={field.state.value}
                              id="discount_amount"
                              title="Discount Amount"
                              type="number"
                              onChange={(e) =>
                                field.handleChange(e.target.valueAsNumber)
                              }
                            />
                          </div>
                        );
                      }}
                    </form.Field>
                  </div>
                </div>
              );
            },
            img_upload: () => {
              return (
                <div className="flex items-center justify-center w-full">
                  <form.Field name="image" validators={{ onChange: () => {} }}>
                    {(field) => {
                      return (
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          {!previewImg ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                          ) : (
                            <img
                              src={previewImg}
                              alt=""
                              className="w-sm h-[200px] object-scale-down"
                            />
                          )}

                          <input
                            id="dropzone-file"
                            type="file"
                            name={field.name}
                            onChange={(e) => {
                              // field.handleChange(e.target.files[0])
                              handlePreviewImage(e);
                            }}
                            className="hidden"
                          />
                        </label>
                      );
                    }}
                  </form.Field>
                </div>
              );
            },
          })}
          {!stepper.isLast ? (
            <div className="flex justify-end gap-4">
              <Button
                variant="secondary"
                type="button"
                onClick={stepper.prev}
                disabled={stepper.isFirst}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={() => {
                  stepper.next();
                }}
              >
                {stepper.isLast ? "Complete" : "Next"}
              </Button>
            </div>
          ) : (
            <div className="flex justify-between gap-4">
              <Button type="button" onClick={stepper.reset}>
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
}

export default AddProduct;
