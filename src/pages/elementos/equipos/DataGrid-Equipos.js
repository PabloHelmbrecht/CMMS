import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const columns = [
  { field: "id", headerName: "ID", minWidth: 20, flex: 1 },
  {
    field: "equipo",
    headerName: "Equipo",
    minWidth: 50,
    flex: 2,
    editable: true
  },
  {
    field: "criticidad",
    headerName: "Criticidad",
    type: "singleSelect",
    valueOptions: ["Muy Alta", "Alta", "Media", "Baja"],
    minWidth: 150,
    flex: 1,
    editable: true,
    renderCell: ({ value }) => {
      //renderizar de una forma cada etiqueta ver si usar switch u otro
      switch (value) {
        case value == "Muy Alta":
          <Chip
            variant="outlined"
            color="warning"
            label={value}
            icon={<ExclamationCircleOutlined />}
          />;
          break;

        default:
          break;
      }
      return (
        <Chip
          variant="outlined"
          color="warning"
          label={value}
          icon={<ExclamationCircleOutlined />}
        />
      );
    }
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`
  }
];

const rows = [
  { id: 1, criticidad: "Muy Alta", equipo: "Jon", age: 35 },
  { id: 2, criticidad: "Muy Alta", equipo: "Cersei", age: 42 },
  { id: 3, criticidad: "Alta", equipo: "Jaime", age: 45 },
  { id: 4, criticidad: "Media", equipo: "Arya", age: 16 },
  { id: 5, criticidad: "Baja", equipo: "Daenerys", age: null },
  { id: 6, criticidad: "Muy Alta", equipo: null, age: 150 },
  { id: 7, criticidad: "Media", equipo: "Ferrara", age: 44 },
  { id: 8, criticidad: "Alta", equipo: "Rossini", age: 36 },
  { id: 9, criticidad: "Baja", equipo: "Harvey", age: 65 }
];

export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </Box>
  );
}
