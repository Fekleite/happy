import React from 'react';

import "../../styles/components/tooltip.css";

interface Props {
  id: string;
  message: string;
}

const Tooltip: React.FC<Props> = ({id, message, children}) => {
  return (
    <div className="container-tooltip success" id={id}>
      {children}
      <span>{message}</span>
    </div>
  );
}

export default Tooltip;