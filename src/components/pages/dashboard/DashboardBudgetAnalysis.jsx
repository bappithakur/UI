import React from "react";
import ReactApexChart from "react-apexcharts";

const anualBudgetData = {
  series: [
    {
      name: "Budgeted Cost",
      data: [550, 800, 1500],
    },
    {
      name: "Actual Cost",
      data: [535, 830, 130],
    },
  ],
  options: {
    title: {
      text: "Budgeted Cost vs Actual Cost",
      align: "left",
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [2020, 2021, 2022],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$ ${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return `$ ${val} thousands`;
        },
      },
    },
  },
};

const potentialBudgetRevenueData = {
  series: [
    {
      name: "Budgeted Cost",
      data: [550, 800, 1500],
    },
    {
      name: "Potential Revenue",
      data: [750, 1150, 1925],
    },
  ],
  options: {
    title: {
      text: "Budgeted Cost vs Potential Revenue",
      align: "left",
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [2020, 2021, 2022],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$ ${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return `$ ${val} thousands`;
        },
      },
    },
  },
};

const actualRevenueData = {
  series: [
    {
      name: "Budgeted Cost",
      data: [550, 800, 1500],
    },
    {
      name: "Potential Revenue",
      data: [735, 1099, 1950],
    },
  ],
  options: {
    title: {
      text: "Actual Cost vs Actual Revenue",
      align: "left",
    },
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [2020, 2021, 2022],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$ ${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return `$ ${val} thousands`;
        },
      },
    },
  },
};

const DashboardBudgetAnalysis = () => {
  return (
    <div className="row mt-2">
      <div className="col-6">
        <ReactApexChart
          options={anualBudgetData.options}
          series={anualBudgetData.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="col-6">
        <ReactApexChart
          options={potentialBudgetRevenueData.options}
          series={potentialBudgetRevenueData.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="col-6">
        <ReactApexChart
          options={actualRevenueData.options}
          series={actualRevenueData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default DashboardBudgetAnalysis;
