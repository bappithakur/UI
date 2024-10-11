import React from "react";
import ReactApexChart from "react-apexcharts";

const data = {
  series: [
    {
      name: "Winter",
      data: [5, 6, 5.5],
    },
    {
      name: "Summer",
      data: [3, 2, 4],
    },
    {
      name: "Spring",
      data: [3.6, 4.5, 5.5],
    },
    {
      name: "Monsoon",
      data: [6.7, 4.7, 3.2],
    },
    {
      name: "Autumn",
      data: [3.2, 3.8, 4.3],
    },
    {
      name: "Pre-Winter  ",
      data: [4.5, 3.8, 4],
    },
  ],
  options: {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: true,
      },
    },
    title: {
      text: "Waste Analysis",
      align: "left",
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
          return `${value} %`;
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

const LineChart2 = () => {
  return (
    <ReactApexChart
      options={data.options}
      series={data.series}
      type="line"
      height={350}
    />
  );
};

export default LineChart2;
