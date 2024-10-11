import React from "react";
import ReactApexChart from "react-apexcharts";

const availableLandByType = {
  series: [
    {
      name: "Contract",
      data: [1800, 1550, 1550],
    },
    {
      name: "Lease",
      data: [800, 2650, 1850],
    },
    {
      name: "Own",
      data: [4650, 1950, 1500],
    },
  ],
  options: {
    title: {
      text: "Available Land By Type",
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
      categories: ["Mar-2022", "Jan-2022", "Feb-2022"],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  },
};

const consumedLandByCrop = {
  series: [
    {
      name: "Carrot",
      data: [870, 500, 0],
    },
    {
      name: "Potato",
      data: [3000, 0, 600],
    },
    {
      name: "Rice",
      data: [1000, 900, 200],
    },
  ],
  options: {
    title: {
      text: "Consumed Land By Crop",
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
      categories: ["Jan-2022", "Mar-2022", "Feb-2022"],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  },
};

const freeLandByType = {
  series: [
    {
      name: "Contract",
      data: [1800, 950, -1450],
    },
    {
      name: "Lease",
      data: [-100, 1850, 2450],
    },
    {
      name: "Own",
      data: [4150, 1300, 280],
    },
  ],
  options: {
    title: {
      text: "Free Land By Type",
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
      categories: ["Mar-2022", "Feb-2022", "Jan-2022"],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `${value}`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        },
      },
    },
  },
};

const DashboardBI2 = () => {
  return (
    <div className="row mt-2">
      <div className="col-6">
        <ReactApexChart
          options={availableLandByType.options}
          series={availableLandByType.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="col-6">
        <ReactApexChart
          options={consumedLandByCrop.options}
          series={consumedLandByCrop.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="col-6">
        <ReactApexChart
          options={freeLandByType.options}
          series={freeLandByType.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default DashboardBI2;
