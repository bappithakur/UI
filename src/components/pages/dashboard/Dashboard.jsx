import React from "react";
import {
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Card, Table } from "antd";
import DGCard from "./common/DGCard";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  BarElement,
  ArcElement,
  LinearScale,
  LineElement,
  PointElement,
  CategoryScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Line Chart",
    },
  },
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 6, 5, 16],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const data = {
  labels,
  datasets: [
    {
      label: "Red",
      data: labels.map(() => randomIntFromInterval(-1000, 1000)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.8)",
    },
    {
      label: "Blue",
      data: labels.map(() => randomIntFromInterval(-1000, 1000)),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.8)",
    },
  ],
};

const dataSource = [
  {
    id: 1,
    zoneCode: "NZ",
    zoneName: "Zone 1",
    altitude: "1",
    latitude: "1",
    longitide: "1",
  },
  {
    id: 2,
    zoneCode: "SZ",
    zoneName: "Zone 2",
    altitude: "1",
    latitude: "1",
    longitide: "1",
  },
];

const columns = [
  {
    title: "Zone Code",
    dataIndex: "zoneCode",
    key: "zoneCode",
  },
  {
    title: "Zone Name",
    dataIndex: "zoneName",
    key: "zoneName",
  },
  {
    title: "Altitude",
    dataIndex: "altitude",
    key: "altitude",
  },
  {
    title: "Latitude",
    dataIndex: "latitude",
    key: "latitude",
  },
  {
    title: "Longitide",
    dataIndex: "longitide",
    key: "longitide",
  },
];

const Dashboard = () => {
  return (
    <>
      <div className="row pt-2">
        <div className="col-12">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-3">
              <DGCard></DGCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <DGCard></DGCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <DGCard></DGCard>
            </div>
            <div className="col-md-6 col-lg-3">
              <DGCard></DGCard>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card bordered={false}>
              <Line options={options} height={250} data={data} />
            </Card>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <Card bordered={false}>
            <Bar options={barOptions} height={250} data={data} />
          </Card>
        </div>
        <div className="col-md-6">
          <Card bordered={false}>
            <Pie
              data={pieData}
              height={250}
              options={{ maintainAspectRatio: false }}
            />
          </Card>
        </div>
        <div className="col-md-12">
          <Table dataSource={dataSource} columns={columns} />
        </div>
      </div>
      <div className="mb-5"></div>
    </>
  );
};

export default Dashboard;
