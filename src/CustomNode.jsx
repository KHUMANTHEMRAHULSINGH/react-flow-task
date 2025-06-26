import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import './CustomNode.css';

const CustomNode = ({ data }) => {
  const [showHello, setShowHello] = useState(false);

  const handleClick = () => {
    setShowHello(!showHello);
  };

  return (
    <div className="custom-node" onClick={handleClick}>
      <strong>{data.label}</strong>
      {showHello && (
        <div className="hello-box">Hello World</div>
      )}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;

