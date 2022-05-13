import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import {Overload, SimpleText, Typography} from './Typography';

export default {
  title: 'Typography',
  component: Typography,
} as ComponentMeta<(props: SimpleText) => JSX.Element>;


const Template: ComponentStory<any> = (args: any) => {
  console.log('args => ', args)
  return <Typography  {...args}/>;
};

export const H1 = Template.bind({});

H1.args = {
  children: <h1>Header 1</h1>
}
