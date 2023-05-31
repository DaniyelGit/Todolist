import React, {ChangeEvent, KeyboardEvent, memo} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
   oldTitle: string
   callBack: (newTitle: string) => void
}

export const EditableSpan = memo((props: EditableSpanPropsType) => {
   const {
      oldTitle,
      callBack,
   } = props;

   const [edit, setEdit] = React.useState<boolean>(false);
   const [newTitle, setNewTitle] = React.useState<string>(oldTitle);

   const editHandler = () => {
      setEdit(!edit);
      callBack(newTitle);
   };

   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.currentTarget.value);
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         editHandler();
      }
   }

   return (
      edit
         ? <TextField type="text"
                      value={newTitle}
                      onChange={onChangeHandler}
                      autoFocus
                      onBlur={editHandler}
                      onKeyPress={onKeyPressHandler}
                      variant={'standard'}
                      size={'small'}
         />
         : <span onDoubleClick={editHandler}>{oldTitle}</span>
   );
});
