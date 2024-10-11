import React from "react";
import ReactApexChart from "react-apexcharts";

const data = {
  series: [
    {
      name: "Labour",
      data: [15, 20, 18, 35, 14, 10, 16, 19, 14, 17],
    },
    {
      name: "Material",
      data: [10, 12, 14, 27, 18, 15, 10, 15, 10, 14],
    },
    {
      name: "Utilities",
      data: [19, 18, 24, 38, 28, 25, 20, 25, 21, 24],
    },
    {
      name: "Tools",
      data: [5, 7, 9, 5, 11, 9, 4, 6, 8, 5],
    },
  ],
  options: {
    title: {
      text: "Monthly Stock Usage",
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
      enabled: true,
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
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return `$ ${val}`;
        },
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

const LineChart = () => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="line"
      height={350}
    />
  );
};

export default LineChart;
