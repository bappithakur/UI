import React from "react";
import ReactApexChart from "react-apexcharts";

const data = {
  series: [
    {
      name: "Chemicals",
      data: [1549.3, 1586.43, 1657.14],
    },
    {
      name: "Fertilizer",
      data: [1852.11, 1917.24, 1892.73],
    },
    {
      name: "Water",
      data: [2776.34, 2747.66, 2940.53],
    },
  ],
  options: {
    title: {
      text: "Current Year Costing Trend",
      align: "left",
    },
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ["2020", "2021", "2022"],
    },
    yaxis: {
      labels: {
        formatter: (value) => {
          return `$ ${value}`;
        },
        offsetX: 0,
        offsetY: 5,
      },
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return `$ ${val} thousands`;
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      floating: true,
      offsetX: 10,
      offsetY: 10,
    },
  },
};

const LineChart1 = () => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="line"
      height={350}
    />
  );
};

export default LineChart1;
