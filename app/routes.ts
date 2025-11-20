import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/Login.tsx"),
  route("/register", "routes/Register.tsx"),
  layout("routes/requireAuth.tsx", [
    layout("routes/layouts/Sidebar.tsx", [
      route("/admin", "routes/AdminDashboard.tsx"),
      route("/brands", "routes/brands/TheBrands.tsx"),
      route("/advertistment", "routes/advertistment/TheAdvertistment.tsx"),
      route("/payment-types", "routes/payment-types/ThePaymentTypes.tsx"),
      route("/item-master", "routes/products/TheProduct.tsx", [
        route("add-product", "routes/products/AddProduct.tsx", [
          route("step-1", "routes/products/form-steps/StepOne.tsx"),
          route("step-2", "routes/products/form-steps/StepTwo.tsx"),
          route("step-3", "routes/products/form-steps/StepThree.tsx"),
        ]),
      ]),
      route("/item-category", "routes/item-category/TheItemCategory.tsx", [
        route("add-item-category", "routes/item-category/AddItemCategory.tsx"),
      ]),
      route("/item-brand", "routes/item-brand/TheItemBrand.tsx", [
        route("add-item-brand", "routes/item-brand/AddItemBrand.tsx"),
      ]),
      route("/customer", "routes/customer/TheCustomer.tsx", [
        route("add-customer", "routes/customer/AddCustomer.tsx", [
          route("step-1", "routes/customer/form-steps/StepOne.tsx"),
          route("step-2", "routes/customer/form-steps/StepTwo.tsx"),
        ]),
      ]),
      route("/supplier", "routes/supplier/TheSupplier.tsx", [
        route("add-supplier", "routes/supplier/AddSupplier.tsx", [
          route("step-1", "routes/supplier/form-steps/StepOne.tsx"),
          route("step-2", "routes/supplier/form-steps/StepTwo.tsx"),
        ]),
      ]),
      route("/grn", "routes/grn/TheGrn.tsx", [
        route("add-grn", "routes/grn/AddGrn.tsx", [
          route("step-1", "routes/grn/form-steps/StepOne.tsx"),
          route("step-2", "routes/grn/form-steps/StepTwo.tsx"),
        ]),
      ]),
      route("/payment-reciept", "routes/payment-reciept/ThePaymentReciept.tsx"),
      route("/sales-return", "routes/sales-return/TheSalesReturn.tsx"),
      route("/faq", "routes/faq/TheFAQ.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
