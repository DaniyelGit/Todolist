import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {action} from '@storybook/addon-actions'
import React from "react";


const meta: Meta<typeof AddItemForm> = {
   title: 'Todolists/AddItemForm',
   component: AddItemForm,
   tags: ['autodocs'],

   argTypes: {
      addItem: {
         name: 'AddItemForm',
         description: 'Нажатие кнопки внутри формы',
         action: 'clicked',
      },
   }
}

export default meta;
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {
   args: {
      addItem: action('clicked')
   }
};



