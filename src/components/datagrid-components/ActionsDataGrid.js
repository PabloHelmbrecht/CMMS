import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
//Icons Import
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default class Actions {
  constructor() {
    this.field = "actions";
    this.headerName = "";
    this.width = 120;
  }

  setField(field) {
    this.field = field;
  }

  setHeaderName(headerName) {
    this.headerName = headerName;
  }

  setWidth(width) {
    this.width = width;
  }

  // Get
  actionsColumn(hoveredRow) {
    return {
      field: this.field,
      headerName: this.headerName,
      width: this.width,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        if (hoveredRow === params.id) {
          return (
            <Box
              sx={{
                // backgroundColor: "whitesmoke",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <IconButton onClick={() => console.log(params.id)}>
                <EditOutlined />
              </IconButton>
              <IconButton onClick={() => console.log(params.id)}>
                <DeleteOutlined />
              </IconButton>
            </Box>
          );
        } else return null;
      }
    };
  }
}
