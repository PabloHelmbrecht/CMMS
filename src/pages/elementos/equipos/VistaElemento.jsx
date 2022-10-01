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
  Badge,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import { Link, useLocation, useParams, Navigate } from "react-router-dom";

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
  MessageFilled,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

//project imports
import useWindowDimensions from "../../../utils/WindowDimensions";
import UpdateMessage from "../../../components/elementview-components/UpdateMessage";
import avatar1 from "../../../assets/images/users/avatar-1.png";
import imageArrayDB from "../../../api/elementos/imageArrayDB.js";
import useKeyPress from "../../../utils/useKeyPress";

/*Función para copiar link no est{a listo todavía*/
const Clipboard = async () => {
  await navigator.clipboard.writeText(useLocation().pathname);
};

const VistaElemento = () => {
  //Obtenemos el tema
  const theme = useTheme();

  // Función para obtener los breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //Obtenemos el id de la ruta
  const { id, mode, elementType } = useParams();
  const location = useLocation();

  //Declaramos los estados

  //Apertura de la vista
  const [open, setOpen] = useState(
    Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0
  );

  //Modo edición activado
  const [editMode, setEditMode] = useState(mode === "edit");

  //Estado para guardar posición del Bottom Navigation en la vista mobile
  const [indexBottomNavigation, setIndexBottomNavigation] = useState(0);

  //Estado para detectar si se está escribiendo un comentario
  const [textFieldFocus, setTextFieldFocus] = useState(false);

  //Estado para detectar si hay un comentario guardado
  const [commentExist, setCommentExist] = useState(false);

  //Imágenes adjuntas
  const [imagesAttached, setImagesAttached] = useState({ length: 0 });

  //Teclas presionadas
  const ArrowLeft = useKeyPress("ArrowLeft");
  const ArrowRight = useKeyPress("ArrowRight");
  const Exit = useKeyPress("Tab");

  //Guardamos el id en el store
  useEffect(() => {
    //Guardamos el id pasado por la ruta en el redux store
    setEditMode(mode === "edit");

    //Si existe un id abrir la vista
    setOpen(Number.isInteger(parseInt(id, 10)) && parseInt(id, 10) > 0);
  }, [id, mode, location]);

  //handler para adjuntar imágenes
  const handleImagesAttached = (e) => {
    const files = e.target.files;

    setImagesAttached({ files, length: parseInt(files.length, 10) });
  };

  //Ir al elemento anterior
  const goToPreviousElement = () => {};

  //Ir al siguiente elemento
  const goToNextElement = () => {};

  //Handler para ocular y mostrar navegación al escribir
  const handleFocus = () => {
    setTextFieldFocus(true);
  };
  const handleBlur = () => {
    setTextFieldFocus(false);
  };
  //Listen to keyboard event
  useEffect(() => {
    if (open) {
      ArrowLeft && goToPreviousElement();
      ArrowRight && goToNextElement();
    }
  }, [ArrowLeft, ArrowRight, open]);

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={"xl"}
      PaperProps={{
        style: {
          height: useWindowDimensions().height * (isMobile ? 0.8 : 0.9) + "px",
          width: "90%",
          overflow: "inherit",
        },
      }}
    >
      {/*Flechas de Navegación*/}
      <IconButton
        onClick={goToPreviousElement}
        size="large"
        color="default"
        sx={{
          position: "absolute",
          bottom: isMobile ? "-4rem" : "50%",
          left: isMobile ? "30%" : "-3rem",
          color: theme.palette.secondary.A100,
        }}
      >
        <LeftOutlined />
      </IconButton>
      <IconButton
        onClick={goToNextElement}
        size="large"
        color="default"
        sx={{
          position: "absolute",
          bottom: isMobile ? "-4rem" : "50%",
          right: isMobile ? "30%" : "-3rem",
          color: theme.palette.secondary.A100,
        }}
      >
        <RightOutlined />
      </IconButton>

      {Exit && <Navigate to={`/elementos/${elementType}`} replace={true} />}

      {/*Header de la vista*/}
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        sx={{ p: 2 }}
      >
        <Grid item xs={4} md={3}>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Chip label="Equipo" color="primary" icon={<CaretDownOutlined />} />
          </Stack>
        </Grid>

        <Grid item xs={8} md={9}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            {editMode ? (
              <Button
                component={Link}
                to={`/elementos/${elementType}/${id}`}
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
                to={`/elementos/${elementType}/${id}/edit`}
                size="small"
                variant="contained"
                color="primary"
                startIcon={<EditFilled />}
              >
                modo edición
              </Button>
            )}
            <IconButton component={Link} to={`/elementos/${elementType}`}>
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
            p: 3,
            display: isMobile && indexBottomNavigation !== 0 ? "none" : "",
            height: "100%",
            overflow: "auto",
            overflowY: "overlay",
            "::-webkit-scrollbar-track": {
              borderRadius: "0px",
              backgroundColor: "rgb(128, 128, 128, 0)",
            },
            "::-webkit-scrollbar": {
              width: "7px",
              backgroundColor: "rgb(128, 128, 128, 0)",
            },

            "::-webkit-scrollbar-thumb": {
              borderRadius: "10px",
              backgroundColor: "rgb(128, 128, 128, 0)",
            },

            ":hover::-webkit-scrollbar-thumb": {
              backgroundColor: "rgb(128, 128, 128, 0.5)",
            },
          }}
        >
          <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={1}>
              <Stack
                direction={isMobile ? "column-reverse" : "row"}
                justifyContent="space-between"
                alignItems={isMobile ? "left" : "center"}
                spacing={0.5}
              >
                {editMode ? (
                  <TextField
                    placeholder="Nombre del Elemento"
                    variant="standard"
                    inputProps={{
                      style: {
                        fontSize: theme.typography.h2.fontSize,
                        fontWeight: theme.typography.h2.fontWeight,
                        lineHeight: theme.typography.h2.lineHeight,
                      },
                    }}
                    sx={{ width: "80%", mb: 2 }}
                    defaultValue="Compresor de Aire"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                ) : (
                  <Typography variant="h2">Compresor de Aire</Typography>
                )}
                <Typography variant="caption" color="textSecondary">
                  {"Actualizado " + moment().calendar()}
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={0.5}
              >
                <Typography
                  variant="Gutter Bottom"
                  color="textSecondary"
                  sx={{ pr: 1 }}
                >
                  Identificador:
                </Typography>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: "#c70039",
                    width: "1rem",
                    height: "1rem",
                  }}
                />
                <Typography variant="Gutter Bottom" color="textPrimaery">
                  #C70039
                </Typography>
              </Stack>
              <Box sx={{ pt: 2 }}>
                <TextField
                  variant="outlined"
                  label="Descripción"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue="Escribe la descripción del elemento aquí"
                  InputProps={{ readOnly: !editMode }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Box>
            </Stack>
            <Card variant="outlined">
              <Typography variant="h5" sx={{ p: 2 }}>
                Información
              </Typography>
              <Divider />
              <Grid container spacing={3} sx={{ p: 2 }}>
                <Grid item xs={12} lg={8}>
                  <TextField
                    label="Ubicación"
                    type="search"
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    select
                    label="Estado"
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <MenuItem key={"Activo"} value={"Activo"}>
                      Activo
                    </MenuItem>
                    <MenuItem key={"Inactivo"} value={"Inactivo"}>
                      Inactivo
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    fullWidth
                    label="Fecha de Creación"
                    defaultValue={moment().format("LL")}
                    InputProps={{
                      readOnly: true,
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    select
                    label="Nivel de Criticidad"
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <MenuItem key={"Muy Alta"} value={"Muy Alta"}>
                      Muy Alta
                    </MenuItem>
                    <MenuItem key={"Alta"} value={"Alta"}>
                      Alta
                    </MenuItem>
                    <MenuItem key={"Media"} value={"Media"}>
                      Media
                    </MenuItem>
                    <MenuItem key={"Baja"} value={"Baja"}>
                      Baja
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <TextField
                    select
                    label="Nivel de Mantenimiento"
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <MenuItem key={"Correctivo"} value={"Correctivo"}>
                      Correctivo
                    </MenuItem>
                    <MenuItem
                      key={"Preventivo Sistemático"}
                      value={"Preventivo Sistemático"}
                    >
                      Preventivo Sistemático
                    </MenuItem>
                    <MenuItem
                      key={"Preventivo Condicional"}
                      value={"Preventivo Condicional"}
                    >
                      Preventivo Condicional
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    label="Proovedor"
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  >
                    <MenuItem key={"Forel"} value={"Forel"}>
                      Forel
                    </MenuItem>
                    <MenuItem key={"Turomas"} value={"Turomas"}>
                      Turomas
                    </MenuItem>
                    <MenuItem key={"Ashton"} value={"Ashton"}>
                      Ashton
                    </MenuItem>
                    <MenuItem key={"Golive"} value={"Golive"}>
                      Golive
                    </MenuItem>
                    <MenuItem key={"Glaston"} value={"Glaston"}>
                      Glaston
                    </MenuItem>
                    <MenuItem key={"Otro"} value={"Otro"}>
                      Otro
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    label="SKU del Proovedor"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: !editMode }}
                    label="Fabricante"
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: !editMode }}
                      label="Link de Documentación"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ height: "100%", width: "100%" }}
                    >
                      Documentación del Elemento
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Card>
            <Card variant="outlined">
              <Typography variant="h5" sx={{ p: 2 }}>
                Componentes
              </Typography>
              <Divider />
              <Grid container spacing={3} sx={{ p: 2 }}>
                {editMode && (
                  <Grid item xs={12}>
                    <TextField
                      label="Buscar componentes"
                      type="search"
                      fullWidth
                      InputProps={{ readOnly: !editMode }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
              </Grid>
            </Card>
            <Card variant="outlined">
              <Typography variant="h5" sx={{ p: 2 }}>
                Actividades
              </Typography>
              <Divider />
            </Card>
            <Card variant="outlined">
              <Typography variant="h5" sx={{ p: 2 }}>
                Fallas y Paradas
              </Typography>
              <Divider />
            </Card>
            <Card variant="outlined">
              <Typography variant="h5" sx={{ p: 2 }}>
                Insumos y Repuestos
              </Typography>
              <Divider />
            </Card>
          </Stack>
        </Grid>

        {/*Divisor entre datos de cargo y actividades*/}
        <Divider
          orientation="vertical"
          flexItem
          sx={{ ml: "-1px", display: isMobile ? "none" : "" }}
        />

        {/*Actividades del la vista*/}
        <Grid
          container
          item
          direction="column"
          xs={12}
          sm={12}
          md={4}
          lg={4}
          sx={{
            height: "100%",
            overflow: "hidden",
            display: isMobile && indexBottomNavigation !== 1 ? "none" : "",
            flexWrap: "nowrap",
          }}
        >
          {/*Listado de actividades*/}
          <Grid
            item
            xs={11}
            xl={10.5}
            sx={{
              p: 2,
              overflow: "auto",
              overflowY: "overlay",
              width: "100%",
              backgroundColor: "secondary.lighter",
              "::-webkit-scrollbar-track": {
                borderRadius: "0px",
                backgroundColor: "rgb(128, 128, 128, 0)",
              },
              "::-webkit-scrollbar": {
                width: "7px",
                backgroundColor: "rgb(128, 128, 128, 0)",
              },

              "::-webkit-scrollbar-thumb": {
                borderRadius: "10px",
                backgroundColor: "rgb(128, 128, 128, 0)",
              },

              ":hover::-webkit-scrollbar-thumb": {
                backgroundColor: "rgb(128, 128, 128, 0.5)",
              },
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
            xs={1}
            sx={{
              p: 1,
              pl: 2,
              pr: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid item xs={11}>
              <TextField
                fullWidth
                id="fullWidth"
                variant="standard"
                placeholder="Comenta..."
                multiline
                rows={3}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => {
                  setCommentExist(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Stack>
                <IconButton
                  color={imagesAttached.length > 0 ? "primary" : "secondary"}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    multiple="multiple"
                    onChange={handleImagesAttached}
                  />
                  <Badge
                    badgeContent={imagesAttached.length || 0}
                    color="primary"
                    invisible={imagesAttached.length <= 0}
                  >
                    <CameraOutlined />
                  </Badge>
                </IconButton>
                <IconButton color={commentExist ? "primary" : "secondary"}>
                  <SendOutlined />
                </IconButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*Divisor de la vista*/}
      <Divider />

      {isMobile && !textFieldFocus && (
        <>
          <BottomNavigation
            showLabels
            value={indexBottomNavigation}
            onChange={(event, newIndex) => {
              setIndexBottomNavigation(newIndex);
            }}
          >
            <BottomNavigationAction
              label="Información"
              icon={<InfoCircleFilled />}
              sx={{ maxWidth: "50%", p: 2, "& svg": { fontSize: 15, mb: 0.5 } }}
            />
            <BottomNavigationAction
              label="Actividades"
              icon={<MessageFilled />}
              sx={{ maxWidth: "50%", p: 2, "& svg": { fontSize: 15, mb: 0.5 } }}
            />
          </BottomNavigation>
          <Divider />
        </>
      )}

      {/*Footer de la vista*/}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={1}
        sx={{
          p: 1,
          pl: 2,
          pr: 2,
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

export default VistaElemento;
