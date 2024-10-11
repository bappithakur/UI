import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = (props) => {
  const data = {
    series: [],
    options: {
      chart: {
        height: 350,
        type: "area",
        // dropShadow: {
        //   enabled: true,
        //   color: "#000",
        //   top: 18,
        //   left: 7,
        //   blur: 10,
        //   opacity: 0.2,
        // },
        toolbar: {
          show: true,
        },
      },
      //colors: [],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        // text: "Average High & Low Temperature",
        // align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
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
          "Nov",
          "Dec",
        ],
        // title: {
        //   text: "Month",
        // },
      },
      yaxis: {
        title: {
          text: "",
        },
        labels: {
          formatter: "",
        },
        // min: 5,
        // max: 40,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        floating: true,
        offsetX: 0,
        offsetY: 0,
      },
    },
  };

  const { series, title, formatter, max } = props;
  data.options.yaxis.title.text = title ? title : "";
  data.options.yaxis.labels.formatter = formatter;
  if (max) {
    data.options.yaxis.max = max;
  }
  return (
    <ReactApexChart
      options={data.options}
      series={series}
      type="area"
      height={350}
    />
  );
};

export default AreaChart;
