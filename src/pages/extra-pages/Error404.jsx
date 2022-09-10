// material-ui
import { Stack, Typography, Button } from "@mui/material";

//React router
import { Link } from "react-router-dom";

// project import
import Error404Image from "../../assets/images/other/Error404.png"

// ==============================|| SAMPLE PAGE ||============================== //

const Error404 = () => (
    <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ p: 4, m: 10 }}
    >
        <img src={Error404Image} alt="Error 404" />
        <Typography variant="h1">
            Página No Encontrada
        </Typography>
        <Typography variant="body1" color="textSecondary"  >
            ¡La página que está buscando fue movida, eliminada, renombrada o podría ser que nunca existió!
        </Typography>
        <Button
            component={Link}
            to={`/`}
            size="big"
            variant="contained"
            color="primary"
            >
            Volver al Inicio
        </Button>
        
    </Stack>
);

export default Error404;