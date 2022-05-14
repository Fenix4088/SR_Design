import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Headers, Overload, Typography } from './Typography';
import {headersArguments} from "./Typography.stories";

export default {
  title: 'Components/Typography/CustomElements',
  component: Typography,
  argTypes: {
    ...headersArguments,
    textType: {
      table: {
        // disable: true,
      },
    },

  },
} as ComponentMeta<Overload>;

const CustomElementsTemplate: ComponentStory<(props: Headers) => JSX.Element> = (args: Headers) => {
  return <Typography {...args} />;
};

export const AnyChild = CustomElementsTemplate.bind({});
AnyChild.args = {
  fontWeight: 'bold',
  children: <div>Div</div>,
};


