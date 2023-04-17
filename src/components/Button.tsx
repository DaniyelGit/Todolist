import React, {memo} from 'react';

export type ButtonPropsType = {
   children: string
   onClick: () => void
   className?: string
}

export const Button = memo((props: ButtonPropsType) => {
   const {
      children,
      onClick,
      className,
   } = props;

   console.log('button')


   return (
      <button className={className} onClick={onClick}>{children}</button>
   );
});
