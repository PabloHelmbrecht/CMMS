//Imports
import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText
} from "@mui/material";
import { Link } from "react-router-dom";


const VistaEquipo = ({ id, isOnEditMode }) => {

    // Estado de apertura o cierre de la vista
    const [open, setOpen] = useState(!(id == null))

    //Estado de apertura o cierre del modo edición
    const [editMode, setEditMode] = useState(isOnEditMode)
    console.log(`modo: ${isOnEditMode} editMode: ${editMode}`)

    //Handler de aperturade la vista
    const handleClickOpen = () => { setOpen(true) }

    //Handler de cierre de la vista
    const handleClose = () => { setOpen(false) }

    //Handler para abrir el modo edición
    const handleOpenEditMode = () => { setEditMode(true) }

    //Handler para cerrar el modo edición y abrir el modo vista
    const handleOpenViewMode = () => { setEditMode(false) }

    return (
        <Dialog open={open} >
            <DialogContent>
                <DialogContentText>
                    El id es {id}, el modo es {editMode ? "edit" : "view"}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    Cerrar
                </Button>
                {editMode ?
                    <Button onClick={handleOpenViewMode}>
                        <Link to={`/elementos/equipos/${id} `} >
                            Cambiar a modo vista
                        </Link>
                    </Button>
                    :
                    <Button onClick={handleOpenEditMode}>
                        <Link to={`/elementos/equipos/${id}/edit `} >
                            Cambiar a modo edición
                        </Link>
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
}

VistaEquipo.defaultProps = {
    isOnEditMode: false,
    id: null
};

VistaEquipo.propTypes = {
    id: PropTypes.number,
    isOnEditMode: PropTypes.bool
};


export default VistaEquipo