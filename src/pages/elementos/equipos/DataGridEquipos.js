//Imports
import React from "react";
//import { useState } from "react";
import { isMobile } from "react-device-detect";
import moment from "moment";
import "moment/locale/es";

//Project Imports
import DataGrid from "../../../components/datagrid-components/DataGrid.js";
import renderCellExpand from "../../../components/datagrid-components/CellExpand.js";

//MUI Imports
import { Chip } from "@mui/material";

//Icons Import
import {
  WarningOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from "@ant-design/icons";

//Cambio lenguaje de moment.js
moment.locale("es");

//Columns Definitions
const columns = [
  {
    field: "id",
    description: "Identificador único del equipo",
    headerName: "ID",
    minWidth: 40,
    flex: 1
  },
  {
    field: "equipo",
    description: "Nombre del equipo",
    headerName: "Equipo",
    minWidth: 80,
    flex: 1,
    renderCell: renderCellExpand,
    editable: true
  },
  {
    field: "criticidad",
    headerName: "Criticidad",
    type: "singleSelect",
    description: "Criticidad del equipo de acuerdo a diferentes variables",
    valueOptions: ["Muy Alta", "Alta", "Media", "Baja"],
    minWidth: 120,
    flex: 2,
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
          icon: <PlusCircleOutlined />
        },
        Baja: {
          color: "success",
          icon: <CheckCircleOutlined />
        }
      };

      return (
        <Chip
          variant="outlined"
          color={chipParams[value]["color"]}
          label={value}
          icon={chipParams[value]["icon"]}
        />
      );
    }
  },
  {
    field: "status",
    headerName: "Estado",
    description:
      "Estado del equipo. Me indica si el equipo está actualmento en funcionamiento o parado",
    type: "singleSelect",
    valueOptions: ["Activo", "Parado"],
    minWidth: 100,
    flex: 2,
    editable: true,
    renderCell: ({ value }) => {
      return (
        <Chip
          variant="outlined"
          color="default"
          label={value}
          icon={value === "Activo" ? <CheckOutlined /> : <CloseOutlined />}
          sx={{
            border: "0px",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        />
      );
    }
  },
  {
    field: "fabricante",
    headerName: "Fabricante",
    description: "Nombre del fabricante de este equipo",
    minWidth: 100,
    flex: 2,
    renderCell: renderCellExpand
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha de Creación",
    description: "Fecha de creación del equipo en el sistema",
    minWidth: 150,
    flex: 2,
    valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm")
  },
  {
    field: "ultimaModificacion",
    headerName: "Última Modificación",
    description: "Fecha de modificación del equipo en el sistema",
    minWidth: 150,
    flex: 2,

    valueFormatter: (params) => moment(params?.value).fromNow()
  },
  {
    field: "actividades",
    headerName: "Actividades",
    type: "number",
    description: "Cantidad de actividades",
    minWidth: 100,
    flex: 1
  },
  {
    field: "ultimaActividad",
    headerName: "Última Actividad",
    description: "Fecha de generación de la última actividad",
    minWidth: 150,
    flex: 2,

    valueFormatter: (params) => moment(params?.value).fromNow()
  }
];

//Rows Definitions
const rows = [
  {
    id: 1,
    criticidad: "Muy Alta",
    equipo: "Jon",
    fabricante: "Forel",
    status: "Activo",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 2,
    criticidad: "Muy Alta",
    equipo: "Cersei",
    fabricante: "Forel",
    status: "Parado",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 3,
    criticidad: "Alta",
    equipo: "Jaime",
    fabricante: "Forel",
    status: "Parado",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 4,
    criticidad: "Media",
    equipo: "Arya",
    fabricante: "Forel",
    status: "Activo",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 5,
    criticidad: "Baja",
    equipo: "Daenerys",
    fabricante:
      "Forelcrfev rewvetrvervtyv bvervtyvtrvtrbvr btyryunbtyuntyiuniutn iuyntuinyubinntu",
    status: "Activo",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 6,
    criticidad: "Muy Alta",
    equipo: null,
    fabricante: "Forel",
    status: "Parado",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 7,
    criticidad: "Media",
    equipo: "Ferrara",
    fabricante: "Forel",
    status: "Activo",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 8,
    criticidad: "Alta",
    equipo: "Rossini",
    fabricante: "Forel",
    status: "Parado",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    actividades: 4,
    ultimaActividad: new Date()
  },
  {
    id: 9,
    criticidad: "Baja",
    equipo: "Harvey",
    fabricante: "Forel",
    status: "Activo",
    fechaCreacion: new Date(),
    ultimaModificacion: new Date(),
    ultimaActividad: new Date()
  }
];

//Data Grid Declaration
export default function DataGridEquipos({onSelection}) {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      showToolbar={!isMobile}
      showQuickFilter={!isMobile}
      other={{
        "onSelectionModelChange": (rowId) => {
          onSelection(rowId)
        }
      }}
    />
  );
}
