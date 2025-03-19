import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo, useState } from "react";

const ActionButton = (p) => {
  return (
    <>
      <button onClick={(e) => window.alert("ok")}>View</button>
      <button>Update</button>
      <button>Delete</button>
    </>
  );
};

export default function TestPage() {
  const [rowData, setRowData] = useState([
    { name: "Alexendatr", age: 12, gender: "female" },
    { name: "Guesdsd", age: 11, gender: "female" },
  ]);

  const [colDefs, setColDefs] = useState([
    { headerName: "Tên người dùng", valueGetter: (p) => p.data.name },
    {
      field: "age",
      headerName: "Tuổi",
      valueFormatter: (p) => p.value.toString() + " tuổi",
    },
    { headerName: "Giới tính của bạn", valueGetter: (p) => p.data.gender },
    { headerName: "Thao tác", cellRenderer: ActionButton },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      // flex: 1,
      filter: true,
      floatingFilter: false,
    };
  });

  return (
    <div className="ag-theme-quartz" style={{ height: 800, fontSize: "16px" }}>
      <AgGridReact
        pagination={true}
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        defaultColDef={defaultColDef}
        rowData={rowData}
        columnDefs={colDefs}
      />
    </div>
  );
}
