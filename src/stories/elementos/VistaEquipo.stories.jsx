import React from 'react';

import VistaElemento from '../../pages/elementos/equipos/VistaElemento';

export default {
    title: 'Elementos/VistaElemento',
    component: VistaElemento,
    
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <VistaElemento {...args} />;

export const ViewMode = Template.bind({});
ViewMode.args = {
    id: 24,
    isOnEditMode: false,
};
