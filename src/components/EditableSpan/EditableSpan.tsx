import React, {ChangeEvent, KeyboardEvent, ReactNode} from 'react';

type EditableSpanPropsType = {
   oldTitle: string
   callBack: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
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
         ? <input type="text"
                  value={newTitle}
                  onChange={onChangeHandler}
                  autoFocus
                  onBlur={editHandler}
                  onKeyPress={onKeyPressHandler}
         />
         : <span onDoubleClick={editHandler}>{oldTitle}</span>
   );
};
