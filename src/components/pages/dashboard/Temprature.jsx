import React from "react";
import AreaChart from "./apex-charts-common/AreaChart";

const sereis1 = [
  {
    name: "High Temprature",
    data: [11, 10, 12, 19, 21, 25, 18, 17, 17.9, 21, 11, 10.23],
  },
  {
    name: "Average Temprature",
    data: [2, 1, 3, 10, 12, 16, 9, 8, 8.9, 12, 2, 1.23],
  },
  {
    name: "Low Temprature",
    data: [-5, -6, -4, 3, 5, 9, 2, 1, 1.9, 5, -5, -5.77],
  },
];

const sereis2 = [
  {
    name: "Comulative Rainfall",
    data: [8, 40, 60, 16, 116, 272, 187.2, 128, 272, 184, 96, 220],
  },
  {
    name: "Precipitation",
    data: [10, 50, 75, 20, 145, 340, 234, 160, 340, 230, 120, 275],
  },
];
const sereis3 = [
  {
    name: "Air Pressure",
    data: [10, 50, 75, 20, 67, 76, 46, 65, 79, 88, 44, 22],
  },
  {
    name: "Humidity",
    data: [62, 43, 92, 60, 91, 74, 77, 67, 52, 72, 52, 66],
  },
];

const Temprature = () => {
  const formatter1 = (val) => {
    return val.toFixed(0);
  };
  const formatter2 = (val) => {
    return val.toFixed(0) + " mm";
  };
  const formatter3 = (val) => {
    return val.toFixed(0) + " %";
  };
  return (
    <div className="row mt-2">
      <div className="col-12 mb-2">
        <AreaChart
          formatter={formatter1}
          title="Temprature in Celcius"
          series={sereis1}
        ></AreaChart>
        <hr />
        <AreaChart
          formatter={formatter2}
          title=""
          series={sereis2}
          colors={["#E3BC0D", "#A5D101"]}
        ></AreaChart>
        <hr />
        <AreaChart
          max={95}
          formatter={formatter3}
          title=""
          series={sereis3}
        ></AreaChart>
      </div>
    </div>
  );
};

export default Temprature;
