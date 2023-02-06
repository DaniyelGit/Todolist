import React from 'react';

export type ButtonPropsType = {
   children: string
   onClick: () => void
}

export const Button = (props: ButtonPropsType) => {
   const {
      children,
      onClick
   } = props;

   return (
      <button onClick={onClick}>{children}</button>
   );
};
