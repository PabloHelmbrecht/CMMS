//Imports
import React, { PropTypes } from 'react';

//MUI Imports
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';


//Data Grid Declaration 
function DataGridCustomized({ rows, columns, pageSize, rowsPerPageOptions, showToolbar, showQuickFilter, sx, other, height }) {
    const theme = useTheme()
    const dataGridSX = {
        p: 1,
        "& .MuiButton-root": {
            mr: 1,
            mb: 1,
            fontWeight: theme.typography.fontWeightRegular + ' !important',
            fontSize: theme.typography.h6
        },
        "& .css-w43z68, .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontWeight: "regular" + ' !important',
            fontSize: "14px !important"
        },
        "& .MuiDataGrid-row": {
            fontSize: "13px"
        },
        "& .MuiDataGrid-columnHeaders,.MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-columnHeader:focus": {
            outline: 'solid #ffffff 0px !important'
        },
        "& .MuiDataGrid-columnSeparator": {
            color: theme.palette.grey[300]
        },
        ".MuiDataGrid-virtualScroller": {
            overflowY: "overlay",
        },
        ".MuiDataGrid-virtualScroller::-webkit-scrollbar-track": {
            borderRadius: "0px",
            backgroundColor: "rgb(128, 128, 128, 0)",
        },
        ".MuiDataGrid-virtualScroller::-webkit-scrollbar": {
            width: "7px",
            height: "7px",
            backgroundColor: "rgb(128, 128, 128, 0)",
        },
        ".MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
            borderRadius: "10px",
            backgroundColor: "rgb(128, 128, 128, 0.5)",

        },
        ...sx
    }
    return (
        <Box sx={{ height: { height }, width: "100%" }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={rowsPerPageOptions}
                components={{
                    Toolbar: showToolbar ? GridToolbar : "",
                }}
                componentsProps={{
                    toolbar: { showQuickFilter: showQuickFilter },
                }}
                sx={dataGridSX}
                disableSelectionOnClick
                {...other}
            />
        </Box>
    );
}

DataGridCustomized.defaultProps = {
    rows: [],
    columns: [],
    height: 400,
    pageSize: 50,
    rowsPerPageOptions: [50],
    showToolbar: true,
    showQuickFilter: true
};


export default DataGridCustomized
