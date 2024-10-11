import { useSelector } from "react-redux";
import React from "react";
import { Select } from "antd";

const CustomDropdown = ({
  selected,
  name,
  requestData: { cb, id, uniqueColumn, field },
}) => {
  const optionsStatus = useSelector((state) => state.dropdownReducer);

  const handleOnChange = (value) => {
    const data = { [uniqueColumn]: id, [field]: value };
    cb(data);
    console.log(data);
  };

  return (
    <>
      <Select
        style={{ width: "100%" }}
        onChange={handleOnChange}
        defaultValue={selected}
        options={optionsStatus[name]}
        placeholder="Please select status"
      />
    </>
  );
};

export default CustomDropdown;
