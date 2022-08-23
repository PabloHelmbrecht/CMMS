//Imports
import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

//Project imports
import MainCard from "../../../components/MainCard";



const VistaEquipo = () => {

    //Obtenemos el id de la ruta
    const { id, mode } = useParams()
    const location = useLocation()
    
    //Declaramos los estados
    const [open, setOpen] = useState(Number.isInteger(parseInt(id)) && parseInt(id) > 0)
    const [editMode, setEditMode] = useState(mode === "edit")

    //Guardamos el id en el store
    useEffect(() => {

        //Guardamos el id pasado por la ruta en el redux store
        setEditMode(mode === "edit")

        //Si existe un id abrir la vista
        setOpen(Number.isInteger(parseInt(id)) && parseInt(id) > 0)

    }, [id, mode, location])




    //! https://stackoverflow.com/questions/70415223/how-to-move-the-image-partially-outside-of-mui-dialog para agregar las flechas afuera

    return (
        <Dialog open={open}
            fullWidth={true}
            maxWidth={'xl'}
            PaperProps={{
                style: { backgroundColor: 'transparent', }
            }}
        >
            <MainCard title="Primary Color"  >
                id: {id} view is open: {open ? "true" : "false"} editMode: {editMode ? "true" : "false"}
                <Button component={Link} to={`/elementos/equipos`}>
                    Cerrar
                </Button>
                {editMode ?
                    <Button component={Link} to={`/elementos/equipos/${id} `}>
                        Cambiar a modo vista
                    </Button>
                    :
                    <Button component={Link} to={`/elementos/equipos/${id}/edit `} >
                        Cambiar a modo edición
                    </Button>
                }
            </MainCard>
        </Dialog>
    )
}


export default VistaEquipo