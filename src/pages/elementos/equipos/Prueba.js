import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Toolbar } from "@mui/material/Toolbar";

const handleCellClick = (param, event) => {
  console.log(param);
  console.log(event);
  if (param.colIndex === 2) {
    event.stopPropagation();
  }
};

const handleRowClick = (param, event) => {
  console.log("Row:");
  console.log(param);
  console.log(event);
};

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 130,
    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "blue",
            fontSize: 18,
            width: "100%",
            textAlign: "right"
          }}
        >
          {cellValues.value}
        </div>
      );
    }
  },
  { field: "lastName", headerName: "Last Name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    headerAlign: "left",
    type: "number",
    //width: 90,
    minWidth: 90,
    flex: 1,
    align: "left"
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 2,
    //width: 160,
    valueGetter: (params) => {
      return `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`;
    }
  }
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Amy", age: 42 },
  {
    id: 3,
    lastName: "IGOTAREALLyLONGNAME!!!!!!!",
    firstName: "Jaime",
    age: 45
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
  { id: 6, lastName: "Melisandre", firstName: "Jane", age: 15 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

export default function DataGridDemo() {
  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        //toolBar={<Toolbar sx={{ backgroundColor: "blue" }} />}
        headerHeight={60}
        rowHeight={120}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />
      <div style={{ margin: "40px", textAlign: "center" }}></div>
    </div>
  );
}
