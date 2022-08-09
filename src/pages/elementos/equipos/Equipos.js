// material-ui
import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";

// project import
import MainCard from "../../../components/MainCard";
import StatisticsCard from "../../../components/cards/statistics/StatisticsCard";
import IncomeAreaChart from "../../dashboard/IncomeAreaChart";
import { useEffect, useState } from "react";
import DataGrid from "./DataGrid-Equipos";

// ==============================|| SAMPLE PAGE ||============================== //

const Equipos = () => {
  const [slot, setSlot] = useState("week");

  const [statistics, setStatistics] = useState({
    Card1: {
      title: "Total de Equipos",
      count: "4.000",
      percentage: -24,
      extra: "20,000"
    },
    Card2: {
      title: "Componentes por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000"
    },
    Card3: {
      title: "Elementos por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000"
    },
    Card4: {
      title: "Actividades por Equipo",
      count: "4.000",
      percentage: 24,
      extra: "20,000"
    }
  });

  //Actualizo los indicadores cuando se actualiza la base de datos
  useEffect(() => {}, []);

  return (
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
            <Typography variant="h5">Equipos</Typography>
          </Grid>

          {/* Botones de Tabla */}
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot("month")}
                color={slot === "month" ? "primary" : "secondary"}
                variant={slot === "month" ? "outlined" : "text"}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot("week")}
                color={slot === "week" ? "primary" : "secondary"}
                variant={slot === "week" ? "outlined" : "text"}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/*Tabla*/}
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <DataGrid />
          </Box>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Equipos;
