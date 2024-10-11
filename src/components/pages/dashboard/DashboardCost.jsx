import React from "react";
import ReactApexChart from "react-apexcharts";
import LineChart from "./apex-charts-common/LineChart";
import LineChart1 from "./apex-charts-common/LineChart1";
import LineChart2 from "./apex-charts-common/LineChart2";

const data = {
  series: [
    {
      name: "2020",
      data: [150.0, 200, 300, 95],
    },
    {
      name: "2021",
      data: [170.0, 250, 325, 105],
    },
    {
      name: "2022",
      data: [205.0, 295, 370, 115],
    },
  ],
  options: {
    title: {
      text: "3 Years Costing Trend",
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
      categories: ["Labour", "Material", "Utilities", "Tools"],
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
        formatter: function (val) {
          return `$ ${val} thousands`;
        },
      },
    },
  },
};

const DashboardCost = () => {
  return (
    <div className="row mt-2">
      <div className="col-6">
        <ReactApexChart
          options={data.options}
          series={data.series}
          type="bar"
          height={350}
        />
      </div>
      <div className="col-6">
        <LineChart />
      </div>
      <div className="col-6">
        <LineChart1 />
      </div>
      <div className="col-6">
        <LineChart2 />
      </div>
    </div>
  );
};

export default DashboardCost;
