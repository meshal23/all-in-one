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
      route("/slider", "routes/slider/TheSlider.tsx"),
      route("/brands", "routes/brands/TheBrands.tsx"),
      route("/advertistment", "routes/advertistment/TheAdvertistment.tsx"),
      route(
        "/delivery-location",
        "routes/delivery-location/TheDeliveryLocation.tsx"
      ),
      route("/payment-types", "routes/payment-types/ThePaymentTypes.tsx"),
      route("/coupon-voucher", "routes/coupon-voucher/TheCouponVoucher.tsx"),
      route("/products", "routes/products/TheProduct.tsx"),
      route("/promotion", "routes/promotion/ThePromotion.tsx"),
      route("/dotd", "routes/deal-of-the-day/TheDealOfTheDay.tsx"),
      route("/blog", "routes/blog/TheBlog.tsx"),
      route("/faq", "routes/faq/TheFAQ.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
