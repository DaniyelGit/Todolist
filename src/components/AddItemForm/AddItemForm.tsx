import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import s from "../Todolist/Todolist.module.css";
import {Button, TextField} from "@mui/material";
import Add from '@mui/icons-material/Add';



type AddItemFormPropsType = {
   addItem: (titleValue: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

   const {
      addItem
   } = props;

   const [valueInput, setValueInput] = useState<string>('');
   const [error, setError] = useState<boolean>(false);
   const [errorText, setErrorText] = useState<string>('')

   const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.currentTarget.value);

      if (error) {
         setError(false);
         setErrorText('');
      }
   };

   const addItemHandler = () => {
      if (valueInput.trim() !== '') {
         addItem(valueInput.trim());
         setValueInput('');
      } else {
         setError(true);
         setErrorText('Требуется заголовок')
      }
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addItemHandler()
      }
   };

   return (
      <div className={s.wrapperAddItemForm}>
         <TextField
            value={valueInput}
            onChange={changeValueInputHandler}
            onKeyPress={onKeyPressHandler}
            error={error}
            label={errorText}
            placeholder="Добавить колонку"
            variant="outlined"
            size="small"
            sx={{
               maxWidth: '300px',
               width: '100%',
               "& .MuiOutlinedInput-root": {
                  borderRadius: "5px 0px 0px 5px",
               },
            }}
         />
         <Button
            sx={{borderRadius: '0px 5px 5px 0px'}}
            variant="contained"
            onClick={addItemHandler}
            size="medium"
         >
            <Add/>
         </Button>
      </div>
   );
});

