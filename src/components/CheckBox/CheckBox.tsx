import React, {ChangeEvent} from 'react';

type CheckBoxPropsType = {
   checked: boolean
   changeChecked: (isDone: boolean) => void
}

export const CheckBox = (props: CheckBoxPropsType) => {
   const {
      checked,
      changeChecked,
   } = props;

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      changeChecked(e.currentTarget.checked)
   }

   return (
      <input type="checkbox" checked={checked} onChange={onChangeHandler}/>
   );
};