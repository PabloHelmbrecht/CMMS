import { useRoutes } from 'react-router-dom';

// project import
import LoginRoutes from './MinimalRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes,LoginRoutes]);
}
