import React, {ChangeEvent, memo} from 'react';

type CheckBoxPropsType = {
   checked: boolean
   changeChecked: (isDone: boolean) => void
}

export const CheckBox = memo((props: CheckBoxPropsType) => {
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
});