import React from "react";
const url =
  "https://app.powerbi.com/view?r=eyJrIjoiM2NkNDUwMGMtYzY4MC00MTFiLTlkMjctYmRmYjJiZTM2Nzg4IiwidCI6ImQyZmM1NTQ4LTZiZjItNGEyOS05YWVmLTM0NmM4MTIxYWZhMiIsImMiOjEwfQ%3D%3D";
const cssStyle = { height: "76vh", width: "100%" };

const DashboardBI = () => {
  return (
    <iframe title="Busines Intelligence Dashboard" src={url} style={cssStyle} />
  );
};
export default DashboardBI;
