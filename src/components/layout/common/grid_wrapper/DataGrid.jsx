import { useCallback, useState } from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

const DataGrid = (props) => {
  const {
    records,
    columns,
    onSelectionChange,
    minHeight,
    uniqueColumn,
    editable,
    loading,
    onRowDoubleClick,
    onEditComplete,
  } = props;
  const [selected, setSelected] = useState(null);
  //const [dataSource, setDataSource] = useState(records);
  const scrollProps = Object.assign(
    {},
    ReactDataGrid.defaultProps.scrollProps,
    {
      autoHide: false,
      alwaysShowTrack: true,
    }
  );

  const onRowChange = useCallback(
    ({ data, selected }) => {
      setSelected(selected);
      if (onSelectionChange) {
        onSelectionChange(data);
      }
    },
    [onSelectionChange]
  );

  const onGridEditComplete = useCallback(
    ({ value, columnId, rowIndex, data }) => {
      if (onEditComplete) {
        const data = [...records];
        data[rowIndex][columnId] = value;
        onEditComplete(data[rowIndex]);
      }
    },
    [onEditComplete, records]
  );

  const onRowClick = useCallback(
    (row, event) => {
      if (event.detail === 2) {
        if (onRowDoubleClick) {
          const { data } = row;
          onRowDoubleClick(data);
        }
      }
    },
    [onRowDoubleClick]
  );

  return (
    <ReactDataGrid
      idProperty={uniqueColumn}
      scrollProps={scrollProps}
      selected={selected}
      checkboxColumn
      editable={editable ?? false}
      loading={loading ?? false}
      onSelectionChange={onRowChange}
      onRowClick={onRowClick}
      onEditComplete={onGridEditComplete}
      showColumnMenuTool={false}
      enableColumnAutosize={true}
      maxRowHeight={700}
      style={{ minHeight: minHeight ?? 300 }}
      columns={columns}
      dataSource={records}
    />
  );
};
export default DataGrid;
