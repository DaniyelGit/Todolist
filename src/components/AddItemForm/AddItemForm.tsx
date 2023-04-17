import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from "../Todolist/Todolist.module.css";

type AddItemFormPropsType = {
   addItem: (titleValue: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

   const {
      addItem
   } = props;

   const [valueInput, setValueInput] = useState<string>('');
   const [error, setError] = useState<string | null>(null);

   const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.currentTarget.value);

      error && setError(null);
   };

   const addItemHandler = () => {
      if (valueInput.trim() !== '') {
         addItem(valueInput.trim());
         setValueInput('');
      } else {
         setError('Title is required');
      }
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addItemHandler()
      }
   };

   return (
      <>
         <input className={error ? s.error : ''}
                value={valueInput}
                onChange={changeValueInputHandler}
                onKeyPress={onKeyPressHandler}
         />
         <button onClick={addItemHandler}>+</button>
         {
            error && <div className={s.errorMessage}>{error}</div>
         }
      </>
   );
});