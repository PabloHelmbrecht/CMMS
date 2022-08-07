// assets
import {
    ClusterOutlined,
} from '@ant-design/icons';

// icons
const icons = {
    ClusterOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
    id: 'elementos',
    title: 'Elementos',
    type: 'group',
    children: [
        {
            id: 'equipos',
            title: 'Equipos',
            type: 'item',
            url: '/elementos/equipos',
            icon: icons.ClusterOutlined,
            breadcrumbs: true
        }
    ]
};

export default utilities;
