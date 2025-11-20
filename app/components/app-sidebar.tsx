import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  Images,
  Megaphone,
  Truck,
  CreditCard,
  TicketCheck,
  ShoppingCart,
  Tags,
  Gift,
  Layers,
  CircleQuestionMark,
  Aperture,
  Users,
  UserCog,
  ScanBarcode,
  Store,
  Calculator,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import NavUser from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { NavLink } from "react-router";

// This is sample data.
const data = {
  user: {
    name: "Admin",
    email: "meshal@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Invoice",
      url: "/invoice",
      icon: Calculator,
      isActive: true,
    },
    {
      title: "Item & Services",
      url: "/item-master",
      icon: Images,
      isActive: true,
      items: [
        {
          title: "Item & Service",
          url: "/item-master",
        },
        {
          title: "Category",
          url: "/item-category",
        },
        {
          title: "Brand",
          url: "/item-brand",
        },
        // {
        //   title: "Color",
        //   url: "#",
        // },
        // {
        //   title: "Unit",
        //   url: "#",
        // },
        // {
        //   title: "Size",
        //   url: "#",
        // },
      ],
    },
    {
      title: "Stocks",
      url: "/grn",
      icon: Store,
      items: [
        {
          title: "GRN",
          url: "/grn",
        },
        {
          title: "Stock In",
          url: "#",
        },
        {
          title: "Stock Dashboard",
          url: "#",
        },
        {
          title: "Sales Quotation",
          url: "#",
        },
        {
          title: "Stock Issue",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "/customer",
      icon: Users,
      items: [
        {
          title: "Customers",
          url: "/customer",
        },
        {
          title: "Payment Reciept",
          url: "/payment-reciept",
        },

        {
          title: "Sales Return",
          url: "/sales-return",
        },
      ],
    },
    {
      title: "Suppliers",
      url: "/supplier",
      icon: UserCog,
      items: [
        {
          title: "Supplier",
          url: "/supplier",
        },
        {
          title: "Payment Voucher",
          url: "/payment-voucher",
        },
        {
          title: "Purchase return",
          url: "/purchase-return",
        },
      ],
    },
    // {
    //   title: "Payment Types",
    //   url: "/payment-types",
    //   icon: CreditCard,
    //   isActive: true,
    // },
    // {
    //   title: "Coupon/Voucher",
    //   url: "/coupon-voucher",
    //   icon: TicketCheck,
    //   isActive: true,
    // },
    // {
    //   title: "Ecom Products",
    //   url: "/products",
    //   icon: ShoppingCart,
    //   isActive: true,
    // },
    {
      title: "Barcode",
      url: "/promotion",
      icon: ScanBarcode,
      isActive: true,
    },
    // {
    //   title: "Deal Of The Day",
    //   url: "/dotd",
    //   icon: Gift,
    //   isActive: true,
    // },
    // {
    //   title: "Blog",
    //   url: "/blog",
    //   icon: Layers,
    //   isActive: true,
    // },
    // {
    //   title: "FAQ",
    //   url: "/faq",
    //   icon: CircleQuestionMark,
    //   isActive: true,
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.user} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
