import moment from "moment";
const formatDate = (param) => {
  if (param) return moment(param).format("MM/DD/YYYY");
  return null;
};

const convertDateToDateTime = (param) => {
  if (param) return moment(param).format("YYYY-MM-DDTHH:mm:ss");
  return null;
};

const createColumn = (records) => {
  let newColumns = [];

  if (records.length > 0 && Object.keys(records[0]).length > 0) {
    Object.keys(records[0]).forEach((value) => {
      if (value !== "id") {
        const text = value;
        const result = text.replace(/([A-Z])/g, " $1");
        const header =
          result
            .replace(/([A-Z])/g, " $1")
            .charAt(0)
            .toUpperCase() + result.slice(1);

        newColumns = newColumns.concat({
          header,
          name: value,
          key: value,
        });
      }
    });
  }

  return newColumns;
};

export const Utils = { formatDate, convertDateToDateTime, createColumn };
