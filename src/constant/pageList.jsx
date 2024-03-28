import {
  // BarChartOutlined,
  // CheckSquareOutlined,
  // CustomerServiceOutlined,
  // FileTextOutlined,
  HomeOutlined,
  // SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { lazy } from "react";
import { generateAuthPage } from "../utils/pages";
// const Activity = lazy(() => import("../pages/activity/Activity"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const DetailDashboard = lazy(() =>
  import("../pages/dashboard/DetailDashboard")
);
const Login = lazy(() => import("../pages/login/Login"));
const Signup = lazy(() => import("../pages/login/Signup"));
const ForgetPass = lazy(() => import("../pages/login/ForgetPass"));
const PassForm = lazy(() => import("../pages/login/components/PassForm"));
const Users = lazy(() => import("../pages/users/Users"));

export const unauthenticatedPageList = [
  {
    path: "login",
    element: <Login />,
    key: "Login",
  },
  {
    path: "register",
    element: <Signup />,
    key: "Signup",
  },   
  {
    path: "register/password",
    element: <PassForm />,
    key: "password",
  },
  {
    path: "forgot_password",
    element: <ForgetPass />,
    key: "forgot_password",
  },
  {
    path: "hanya",
    element: <Dashboard />,
    key: "hanya",
  },
];

// ? Documentation in src/utils/pages.js
export const authenticatedPageList = () =>
  [
    generateAuthPage({
      element: <Dashboard />,
      icon: <HomeOutlined />,
      key: "dashboard",
      label: "Open Ticket",
      description:
        "Provides administrators direct access to important Encompass tools.",
    }),
    // generateAuthPage({
    //   element: <DetailDashboard />,
    //   icon: <HomeOutlined />,
    //   key: "dashboard/ticket",
    //   label: "Ticket",
    //   description:
    //     "Provides administrators direct access to important Encompass tools.",
    // }),
    generateAuthPage({
      element: <Users />,
      icon: <TeamOutlined />,
      key: "users",
      label: "Users",
      description: "Provides user information and activity log.",
    }),
    // generateAuthPage({
    //   element: <Activity />,
    //   icon: <BarChartOutlined />,
    //   key: "activity",
    //   label: "Activity",
    //   description: "Provides activity information.",
    // }),
    // generateAuthPage({
    //   element: <>Task</>,
    //   icon: <CheckSquareOutlined />,
    //   key: "task",
    //   label: "Task",
    //   description: "Provides task information.",
    // }),
    // {
    //   type: "divider",
    //   style: { margin: "10px 0" },
    // },
    // generateAuthPage({
    //   element: <>Setting</>,
    //   icon: <SettingOutlined />,
    //   key: "setting",
    //   label: "Setting",
    //   description: "Provides account profile and configuration.",
    // }),
    // // ? Use generateAuthParentPage() if menu has submenu
    // generateAuthParentPage({
    //   key: "report",
    //   label: "Report",
    //   icon: <FileTextOutlined />,
    //   children: [
    //     generateAuthPage({
    //       element: <>Activity Report</>,
    //       key: "activity_report",
    //       label: "Activity",
    //       icon: <FileTextOutlined />,
    //       description: "Provides activity report.",
    //     }),
    //     generateAuthPage({
    //       element: <>Task Report</>,
    //       key: "task_report",
    //       label: "Task",
    //       icon: <FileTextOutlined />,
    //       description: "Provides task report.",
    //     }),
    //     generateAuthPage({
    //       element: <>Users Report</>,
    //       key: "users_report",
    //       label: "Users",
    //       icon: <FileTextOutlined />,
    //       description: "Provides users report.",
    //     }),
    //   ],
    // }),
    // generateAuthPage({
    //   element: <>Support</>,
    //   icon: <CustomerServiceOutlined />,
    //   key: "support",
    //   label: "Support",
    //   description:
    //     "Answer questions by customers and help them in using the product and get the most out of it.",
    // }),
  ].filter((page) => !page.unauthorized || page?.children?.length < 0);

export const authenticatedDetailPageList = () => [
  generateAuthPage({
    element: <DetailDashboard />,
    key: "dashboard/:id",
  }), 
];
