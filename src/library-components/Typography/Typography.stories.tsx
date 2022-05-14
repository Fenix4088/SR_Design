import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Headers, Overload, Typography } from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  argTypes: {
    fontWeight: {
      description: 'Font weight of headers',
      options: ['bold', 'semi-bold'],
      control: {
        type: 'radio',
        labels: {
          some: 'some'
        }
      },
    },
    textType: {
      table: {
        disable: true,
      },
    },
    children: {
      description: "JSX element, should be a tag h1-h6",
    }
  },
} as ComponentMeta<Overload>;

const HeaderTemplate: ComponentStory<(props: Headers) => JSX.Element> = (args: Headers) => {
  return <Typography {...args} />;
};

export const H1 = HeaderTemplate.bind({});
H1.args = {
  fontWeight: 'bold',
  children: <h1>Header 1</h1>,
};

export const H2 = HeaderTemplate.bind({});
H2.args = {
  children: <h2>Header 2</h2>,
};

export const H3 = HeaderTemplate.bind({});
H3.args = {
  children: <h3>Header 3</h3>,
};

export const H4 = HeaderTemplate.bind({});

H4.args = {
  children: <h4>Header 4</h4>,
};

export const H5 = HeaderTemplate.bind({});

H5.args = {
  children: <h5>Header 5</h5>,
};

export const H6 = HeaderTemplate.bind({});

H6.args = {
  children: <h6>Header 6</h6>,
};
