// material-ui imports
import {
  Button,
  Grid,
  Stack,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

//third-party imports
import React, { useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

//icons imports
import { EditFilled, EyeFilled } from "@ant-design/icons";

// project imports
import MainCard from "../../../components/MainCard";
import StatisticsCard from "../../../components/cards/statistics/StatisticsCard";
import DataGridEquipos from "./DataGridEquipos.jsx";
import VistaEquipo from "./VistaEquipo.jsx";
import ElementDefinition from "../../../utils/ElementDefinition";
import Error404 from "../../extra-pages/Error404";

// ==============================|| SAMPLE PAGE ||============================== //

const Equipos = () => {
  // Función para obtener los breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  //Obtenemos el id pasado por router
  const { id, elementType } = useParams();

  //Declaro el objeto elemento a partir de la clase Element Definition
  const element = new ElementDefinition(elementType);

  //Guardar estadísticas en un state para su persistencia
  const [statistics, setStatistics] = useState({
    Card1: {
      title: "Total de Equipos",
      count: "4.000",
      percentage: -24,
      extra: "20,000",
    },
    Card2: {
      title: "Componentes por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000",
    },
    Card3: {
      title: "Elementos por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000",
    },
    Card4: {
      title: "Actividades por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000",
    },
  });

  //Handler para selección de fila en data grid
  const [rowSelected, setRowSelected] = useState(id);

  return element.exists() ? (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* Fila 1: Titulo Indicadores */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Indicadores</Typography>
        </Grid>

        {/* Fila 2: Indicadores */}
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticsCard
            title={statistics.Card1.title}
            count={statistics.Card1.count}
            percentage={statistics.Card1.percentage}
            extra={statistics.Card1.extra}
            beforeText="Se crearon "
            afterText="en el último mes"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticsCard
            title={statistics.Card2.title}
            count={statistics.Card2.count}
            percentage={statistics.Card2.percentage}
            extra={statistics.Card2.extra}
            afterText="en el último mes"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticsCard
            title={statistics.Card3.title}
            count={statistics.Card3.count}
            percentage={statistics.Card3.percentage}
            extra={statistics.Card3.extra}
            beforeText="Se crearon "
            afterText="en el último mes"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <StatisticsCard
            title={statistics.Card4.title}
            count={statistics.Card4.count}
            percentage={statistics.Card4.percentage}
            extra={statistics.Card4.extra}
            beforeText="Se crearon "
            afterText="en el último mes"
          />
        </Grid>

        {/* Separador */}
        <Grid
          item
          md={8}
          sx={{ display: { sm: "none", md: "block", lg: "none" } }}
        />

        {/* Fila 3: Tabla */}
        <Grid item xs={12} md={12} lg={12}>
          {/* Título y Botones de Tabla */}
          <Grid container alignItems="center" justifyContent="space-between">
            {/* Título de Tabla */}
            <Grid item>
              <Typography variant="h5">{element.capitalized()}</Typography>
            </Grid>

            {/* Botones de Tabla */}
            <Grid item>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ pt: isMobile ? 1 : 0 }}
              >
                {rowSelected && (
                  <Tooltip title={`Ver ${element.singular()} seleccionado`}>
                    <Button
                      size="small"
                      color={"primary"}
                      variant={"contained"}
                      startIcon={<EyeFilled />}
                      component={Link}
                      to={`/elementos/${element.getName()}/${rowSelected} `}
                    >
                      Ver
                    </Button>
                  </Tooltip>
                )}
                {rowSelected && (
                  <Tooltip title={`Editar ${element.singular()} seleccionado`}>
                    <Button
                      size="small"
                      color={"primary"}
                      variant={"outlined"}
                      startIcon={<EditFilled />}
                      component={Link}
                      to={`/elementos/${element.getName()}/${rowSelected}/edit `}
                    >
                      Editar
                    </Button>
                  </Tooltip>
                )}
                <Button
                  size="small"
                  onClick={() => {}}
                  color={rowSelected ? "secondary" : "primary"}
                  variant={"contained"}
                >
                  Crear {element.singularCapitalized()}
                </Button>
                <Button
                  size="small"
                  onClick={() => {}}
                  color={rowSelected ? "secondary" : "primary"}
                  variant={"outlined"}
                >
                  Crear Elemento
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {/*Tabla*/}
          <MainCard content={false} sx={{ mt: 1.5 }}>
            <DataGridEquipos onSelection={setRowSelected} />
          </MainCard>
        </Grid>
      </Grid>
      <VistaEquipo />
    </>
  ) : (
    <Error404 />
  );
};

export default Equipos;
