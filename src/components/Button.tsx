import React from 'react';

export type ButtonPropsType = {
   children: string
   onClick: () => void
   className?: string
}

export const Button = (props: ButtonPropsType) => {
   const {
      children,
      onClick,
      className,
   } = props;


   return (
      <button className={className} onClick={onClick}>{children}</button>
   );
};
