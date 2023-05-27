import React, {ChangeEvent, memo} from 'react';
import {TaskStatuses} from "../../api/todolists-api";

type CheckBoxPropsType = {
   checked: TaskStatuses
   changeStatusTaskHandler: (status: TaskStatuses) => void
}

export const CheckBox = memo((props: CheckBoxPropsType) => {
   const {
      checked,
      changeStatusTaskHandler,
   } = props;

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      changeStatusTaskHandler(newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
   }

   return (
      <input type="checkbox" checked={checked === TaskStatuses.Completed} onChange={onChangeHandler}/>
   );
});