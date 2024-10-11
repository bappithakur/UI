import uuid from "react-uuid";

import {
  User,
  FarmerRegisteration,
  FarmerDuty,
  Contract,
  CountrySeason,
  StandardYield,
  Activity,
  CropActivity,
  Disease,
  Insect,
  DashboardBI,
  DashboardTemprature,
  DashboardCost,
  Country,
  Question,
  CropCycle,
  CropClassification,
  FieldSupervisor,
  CropMaster,
  ContractReview,
  WorkOrderHeader,
  FarmerActivity,
  SupervisorActivity,
  FormSurvey,
  BusinessPlan,
  LandPlanning,
  FinancialYear,
  GanttChart,
  LandRegisteration,
  DashboardBI2,
  Uom,
} from "..";
import DashboardBudgetAnalysis from "../dashboard/DashboardBudgetAnalysis";

export const NAV_ITEMS = [
  {
    group: "",
    guid: uuid(),
    menu: [
      {
        guid: uuid(),
        title: "Dashboard",
        icon: "IconDashboard",
        items: [
          // {
          //   guid: uuid(),
          //   title: "Dashboard",
          //   element: <Dashboard />,
          //   url: null,
          // },
          {
            guid: uuid(),
            title: "Land Analysis",
            element: <DashboardBI />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Land Analysis 2",
            element: <DashboardBI2 />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Weather Journal",
            element: <DashboardTemprature />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Cost Analysis",
            element: <DashboardCost />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Budget Analysis",
            element: <DashboardBudgetAnalysis />,
            url: null,
          },
        ],
      },
      {
        guid: uuid(),
        title: "Gantt",
        icon: "IconChartCandle",
        element: <GanttChart />,
        url: null,
        items: [],
      },
      {
        guid: uuid(),
        title: "Geo Information",
        icon: "IconMap2",
        items: [
          { guid: uuid(), title: "Country", element: <Country />, url: null },
        ],
      },
      {
        guid: uuid(),
        title: "Seasons",
        icon: "IconSunset2",
        items: [
          {
            guid: uuid(),
            title: "Season Country",
            element: <CountrySeason />,
            url: null,
          },
        ],
      },
      {
        guid: uuid(),
        title: "Resources",
        icon: "IconBrandEnvato",
        items: [
          {
            guid: uuid(),
            title: "Farmers",
            element: <FarmerRegisteration />,
            url: null,
          },

          {
            guid: uuid(),
            title: "Field Supervisor",
            element: <FieldSupervisor />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Team Assignments",
            element: <FarmerDuty />,
            url: null,
          },
          // {
          //   guid: uuid(),
          //   title: "Supervisor Duties",
          //   element: <SupervisorDuties />,
          //   url: null,
          // },
        ],
      },
      {
        guid: uuid(),
        title: "Contracts",
        icon: "IconWreckingBall",
        items: [
          {
            guid: uuid(),
            title: "Land Registeration",
            element: <LandRegisteration />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Land Contracts",
            element: <Contract />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Contract Review",
            element: <ContractReview />,
            url: null,
          },
        ],
      },
      {
        guid: uuid(),
        title: "Crops",
        icon: "IconTractor",
        items: [
          {
            guid: uuid(),
            title: "Crop Classification",
            element: <CropClassification />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Crop Master",
            element: <CropMaster />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Activity Master",
            element: <Activity />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Crop Activity",
            element: <CropActivity />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Standard Yield",
            element: <StandardYield />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Insects",
            element: <Insect />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Diseases",
            element: <Disease />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Crop Cycle",
            element: <CropCycle />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Uom",
            element: <Uom />,
            url: null,
          },
        ],
      },
      {
        guid: uuid(),
        title: "Planing",
        icon: "IconWreckingBall",
        items: [
          {
            guid: uuid(),
            title: "Business Plan",
            element: <BusinessPlan />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Land Planning",
            element: <LandPlanning />,
            url: null,
          },
        ],
      },
      {
        guid: uuid(),
        title: "Work Orders",
        icon: "IconWreckingBall",
        items: [
          {
            guid: uuid(),
            title: "Work Order",
            element: <WorkOrderHeader />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Farmer Activities",
            element: <FarmerActivity />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Supervisor Activities",
            element: <SupervisorActivity />,
            url: null,
          },
        ],
      },
    ],
  },
  {
    group: "",
    guid: uuid(),
    menu: [
      {
        guid: uuid(),
        title: "Question Bank",
        icon: "IconQuestionMark",
        items: [
          {
            guid: uuid(),
            title: "Questionaire",
            element: <Question />,
            url: null,
          },
          {
            guid: uuid(),
            title: "Survey",
            element: <FormSurvey />,
            url: null,
          },
        ],
      },
    ],
  },
  {
    group: "",
    guid: uuid(),
    menu: [
      {
        guid: uuid(),
        title: "Masters",
        icon: "IconQuestionMark",
        items: [
          {
            guid: uuid(),
            title: "Financial Year",
            element: <FinancialYear />,
            url: null,
          },
          {
            guid: uuid(),
            title: "User",
            element: <User />,
            url: null,
          },
        ],
      },
    ],
  },
];

export default NAV_ITEMS;
