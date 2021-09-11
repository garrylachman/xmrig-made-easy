/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React from 'react';
import { UIContext } from 'renderer/core/UI';

type CardsBoardProps = React.DetailedHTMLProps<
  React.FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
> & {
  useForm?: boolean;
};

const CardsBoard: React.FC<CardsBoardProps> = ({
  children,
  onChange,
  useForm = true,
}) => {
  const { cardColumns } = React.useContext(UIContext);

  const style = React.useMemo(
    () => ({
      columnCount: cardColumns,
      columnWidth: '200px',
      display: 'table-column',
    }),
    [cardColumns]
  );

  if (useForm) {
    return (
      <form onChange={onChange} className="grid">
        <div style={style}>{children}</div>
      </form>
    );
  }

  return (
    <div className="grid">
      <div style={style}>{children}</div>
    </div>
  );
};

export default CardsBoard;
