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
      route(
        "/delivery-location",
        "routes/delivery-location/TheDeliveryLocation.tsx"
      ),
      route("/payment-types", "routes/payment-types/ThePaymentTypes.tsx"),
      route("/coupon-voucher", "routes/coupon-voucher/TheCouponVoucher.tsx"),
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
      route("/dotd", "routes/deal-of-the-day/TheDealOfTheDay.tsx"),
      route("/blog", "routes/blog/TheBlog.tsx"),
      route("/faq", "routes/faq/TheFAQ.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
