import React from 'react';

import VistaEquipo from '../../pages/elementos/equipos/VistaEquipo';

export default {
    title: 'Elementos/VistaEquipo',
    component: VistaEquipo,
    
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <VistaEquipo {...args} />;

export const ViewMode = Template.bind({});
ViewMode.args = {
    id: 24,
    isOnEditMode: false,
};
