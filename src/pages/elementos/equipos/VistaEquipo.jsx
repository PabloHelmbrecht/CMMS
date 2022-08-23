//Imports
import React, { useEffect } from "react";
import {
    Button,
    Dialog
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Project imports
import MainCard from "../../../components/MainCard";
import { setID, activeEditMode, openView } from "../../../store/reducers/equipmentView"



const VistaEquipo = () => {


    //Obtener estados de redux
    const { elementID, editMode, viewOpen } = useSelector((state) => state.equipmentView);
    const dispatch = useDispatch()

    //Obtenemos el id de la ruta
    const { id, setEditMode } = useParams()

    //Activador de vista
    const handleViewToggle = () => {
        dispatch(openView({ viewOpen: !viewOpen }));
    };

    //Activador de modo edición
    const handleEditModeToggle = () => {
        dispatch(activeEditMode({ editMode: !editMode }));
    };

    //Guardamos el id en el store
    useEffect(() => {

        //Guardamos el id pasado por la ruta en el redux store
        dispatch(setID({ elementID: id }))

        //Si existe un id abrir la vista
        id && dispatch(openView({ viewOpen: true }))

        //Si la ruta contiene edit activar el modo edición
        dispatch(activeEditMode({ editMode: setEditMode==="edit" }))
    }, [id, setEditMode,dispatch])




    //! https://stackoverflow.com/questions/70415223/how-to-move-the-image-partially-outside-of-mui-dialog para agregar las flechas afuera

    return (
        <Dialog open={viewOpen}
            fullWidth={true}
            maxWidth={'xl'}
            PaperProps={{
                style: { backgroundColor: 'transparent', }
            }}
        >
            <MainCard title="Primary Color"  >
                elementID: {elementID} openView: {viewOpen ? "true" : "false"} editMode: {editMode ? "true" : "false"}
                <Button onClick={handleViewToggle} component={Link} to={`/elementos/equipos`}>
                    Cerrar
                </Button>
                {editMode ?
                    <Button onClick={handleEditModeToggle} component={Link} to={`/elementos/equipos/${elementID} `}>
                        Cambiar a modo vista
                    </Button>
                    :
                    <Button onClick={handleEditModeToggle} component={Link} to={`/elementos/equipos/${elementID}/edit `} >
                        Cambiar a modo edición
                    </Button>
                }
            </MainCard>
        </Dialog>
    )
}


export default VistaEquipo