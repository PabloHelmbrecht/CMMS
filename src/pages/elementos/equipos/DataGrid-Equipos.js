import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import {
  WarningOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined
} from "@ant-design/icons";

const columns = [
  { field: "id", headerName: "ID", minWidth: 40, flex: 1 },
  {
    field: "equipo",
    headerName: "Equipo",
    minWidth: 80,
    flex: 2,
    editable: true
  },
  {
    field: "criticidad",
    headerName: "Criticidad",
    type: "singleSelect",
    valueOptions: ["Muy Alta", "Alta", "Media", "Baja"],
    minWidth: 120,
    flex: 1,
    editable: true,
    renderCell: ({ value }) => {
      const chipParams = {
        "Muy Alta": {
          color: "error",
          icon: <WarningOutlined />
        },
        Alta: {
          color: "warning",
          icon: <ExclamationCircleOutlined />
        },
        Media: {
          color: "primary",
          icon:<PlusCircleOutlined />
        },
        Baja: {
          color: "success",
          icon: <CheckCircleOutlined />
        }
      };

    
      return (
        <Chip
          variant="outlined"
          color={chipParams.[value].color}
          label={value}
          icon={chipParams.[value].icon}
        />
      );
    }
  },
  {
    field: "status",
    headerName: "Estado",
    type: "singleSelect",
    valueOptions: ["Activo","Parado"],
    minWidth: 50,
    flex: 1,
    editable: true,
    renderCell: ({ value }) => {
      
      if(value=="Activo"){
        value = <><ExclamationCircleOutlined /> Activo</>
      }
      return value
    }
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
  { id: 1, criticidad: "Muy Alta", equipo: "Jon", status: "Activo"  },
  { id: 2, criticidad: "Muy Alta", equipo: "Cersei", status: "Parado"  },
  { id: 3, criticidad: "Alta", equipo: "Jaime", status: "Parado"  },
  { id: 4, criticidad: "Media", equipo: "Arya", status: "Activo"  },
  { id: 5, criticidad: "Baja", equipo: "Daenerys", status: "Activo"  },
  { id: 6, criticidad: "Muy Alta", equipo: null, status: "Parado"  },
  { id: 7, criticidad: "Media", equipo: "Ferrara", status: "Activo"  },
  { id: 8, criticidad: "Alta", equipo: "Rossini", status: "Parado"  },
  { id: 9, criticidad: "Baja", equipo: "Harvey", status: "Activo"  }
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
