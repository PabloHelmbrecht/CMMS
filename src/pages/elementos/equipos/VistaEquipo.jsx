//Imports
import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Button,
  TextField,
  Dialog,
  Divider,
  Card,
  Grid,
  IconButton,
  Stack,
  Chip,
  useTheme,
  useMediaQuery,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { Link, useLocation, useParams } from "react-router-dom";

//icons imports
import {
  CloseOutlined,
  EyeFilled,
  EditFilled,
  CaretDownOutlined,
  PrinterFilled,
  LinkOutlined,
  SendOutlined,
  CameraOutlined,
  InfoCircleFilled,
  MessageFilled
} from "@ant-design/icons";

//project imports
import useWindowDimensions from "../../../utils/WindowDimensions";
import UpdateMessage from "../../../components/elementview-components/UpdateMessage";
import avatar1 from "../../../assets/images/users/avatar-1.png";
import imageArrayDB from "../../../api/elementos/imageArrayDB.js";

/*Función para copiar link no est{a listo todavía*/
const Clipboard = async () => {
  await navigator.clipboard.writeText(useLocation().pathname);
};

const VistaEquipo = () => {
  // Función para obtener los breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //Obtenemos el id de la ruta
  const { id, mode } = useParams();
  const location = useLocation();

  //Declaramos los estados
  const [open, setOpen] = useState(
    Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0
  );
  const [editMode, setEditMode] = useState(mode === "edit");
  const [indexBottomNavigation, setIndexBottomNavigation] = useState(0)

  //Guardamos el id en el store
  useEffect(() => {
    //Guardamos el id pasado por la ruta en el redux store
    setEditMode(mode === "edit");

    //Si existe un id abrir la vista
    setOpen(Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0);
  }, [id, mode, location]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={"xl"}
      PaperProps={{
        style: {
          height: useWindowDimensions().height * 0.9 + "px"
        }
      }}
    >
      {/*Header de la vista*/}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Grid item xs={3}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Chip label="Equipo" color="primary" icon={<CaretDownOutlined />} />
          </Stack>
        </Grid>

        <Grid item xs={9}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {editMode ? (
              <Button
                component={Link}
                to={`/elementos/equipos/${id}`}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<EyeFilled />}
              >
                modo vista
              </Button>
            ) : (
              <Button
                component={Link}
                to={`/elementos/equipos/${id}/edit`}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<EditFilled />}
              >
                modo edición
              </Button>
            )}
            <IconButton component={Link} to={`/elementos/equipos`}>
              <CloseOutlined />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>

      {/*Divisor de la vista*/}
      <Divider />

      {/*Body de la vista*/}
      <Grid
        container
        spacing={0}
        sx={{ height: "100%", width: "100%", m: 0, overflow: "hidden" }}
      >
        {/*Datos de carga del elemento*/}
        <Grid
          item
          xs={12}
          sm={12}
          md={8}
          lg={8}
          sx={{
            p: 2,
            display: (isMobile && (indexBottomNavigation !== 0)) ? "none" : "",
            height: "100%",
            overflow: "auto",
            overflowY: "overlay",
            "::-webkit-scrollbar-track": {
              borderRadius: "0px",
              backgroundColor: "rgb(128, 128, 128, 0)"
            },
            "::-webkit-scrollbar": {
              width: "7px",
              backgroundColor: "rgb(128, 128, 128, 0)"
            },

            "::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: "rgb(128, 128, 128, 0)"
            },

            ":hover::-webkit-scrollbar-thumb": {
              backgroundColor: "rgb(128, 128, 128, 0.5)"
            }
          }}
        >
          <Stack direction="column" spacing={2}>
            <Card sx={{ height: "300px" }} variant="outlined">
              card
            </Card>
            <Card sx={{ height: "300px" }} variant="outlined">
              card
            </Card>
          </Stack>
        </Grid>

        {/*Divisor entre datos de cargo y actividades*/}
        <Divider orientation="vertical" flexItem sx={{ ml: "-1px", display: isMobile?"none":"" }} />

        {/*Actividades del la vista*/}
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{ height: "100%", overflow: "hidden", display: (isMobile && (indexBottomNavigation !== 1)) ? "none" : "" }}
        >
          {/*Listado de actividades*/}
          <Grid
            item
            xs={9}
            md={10}
            xl={11}
            sx={{
              p: 2,
              overflow: "auto",
              overflowY: "overlay",
              width: "100%",
              backgroundColor: "secondary.lighter",
              "::-webkit-scrollbar-track": {
                borderRadius: "0px",
                backgroundColor: "rgb(128, 128, 128, 0)"
              },
              "::-webkit-scrollbar": {
                width: "7px",
                backgroundColor: "rgb(128, 128, 128, 0)"
              },

              "::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                backgroundColor: "rgb(128, 128, 128, 0)"
              },

              ":hover::-webkit-scrollbar-thumb": {
                backgroundColor: "rgb(128, 128, 128, 0.5)"
              }
            }}
          >
            <Stack direction="column" spacing={3}>
              <UpdateMessage
                avatar={avatar1}
                time={moment().calendar()}
                content={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula augue quis hendrerit placerat. Integer sodales nulla leo, ac condimentum nulla vestibulum eu. Quisque fringilla tristique sapien, vel ultrices mauris maximus ut. Pellentesque lobortis vel risus a hendrerit. In hendrerit, nisl eget commodo consectetur, orci arcu molestie justo,"
                }
                imageArray={imageArrayDB()}
              />
              <UpdateMessage
                type={"workOrder"}
                time={moment().calendar()}
                content={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula augue quis hendrerit placerat."
                }
              />
              <UpdateMessage
                type={"activity"}
                time={moment().calendar()}
                content={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula augue quis hendrerit placerat. Integer sodales nulla leo, ac condimentum nulla vestibulum eu. Quisque fringilla tristique sapien, vel ultrices mauris maximus ut. Pellentesque lobortis vel risus a hendrerit. In hendrerit, nisl eget commodo consectetur, orci arcu molestie justo,"
                }
              />
              <UpdateMessage
                type={"update"}
                time={moment().calendar()}
                content={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula augue quis hendrerit placerat."
                }
              />
              <UpdateMessage
                time={moment().calendar()}
                content={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula augue quis hendrerit placerat."
                }
              />
            </Stack>
          </Grid>

          {/*Divisor*/}
          <Divider flexItem sx={{ mt: "-1px" }} />

          {/*Input de comentarios*/}
          <Grid
            item
            container
            xs={3}
            md={2}
            xl={1}
            sx={{ p: 1, pl: 2, pr: 2, display: "flex", alignItems: "center" }}
          >
            <Grid item xs={11}>
              <TextField
                fullWidth
                id="fullWidth"
                variant="standard"
                placeholder="Comenta..."
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={1}>
              <Stack>
                <IconButton color="secondary">
                  <CameraOutlined />
                </IconButton>
                <IconButton color="primary">
                  <SendOutlined />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*Divisor de la vista*/}
      <Divider />

      {isMobile &&
        <>
          <BottomNavigation
            showLabels
            value={indexBottomNavigation}
            onChange={(event, newIndex) => {
              setIndexBottomNavigation(newIndex);
            }}
          >
            <BottomNavigationAction label="Información" icon={<InfoCircleFilled />} sx={{ maxWidth: "50%", p: 2, '& svg': { fontSize: 15, mb: 0.5 } }} />
            <BottomNavigationAction label="Actividades" icon={<MessageFilled />} sx={{ maxWidth: "50%", p: 2, '& svg': { fontSize: 15, mb: 0.5 } }} />
          </BottomNavigation>
          <Divider />
        </>
      }

      {/*Footer de la vista*/}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          p: 1,
          pl: 2,
          pr: 2
        }}
      >
        <IconButton onClick={Clipboard} color="secondary">
          <LinkOutlined />
        </IconButton>
        <IconButton color="secondary">
          <PrinterFilled />
        </IconButton>
      </Stack>
    </Dialog>
  );
};

export default VistaEquipo;
