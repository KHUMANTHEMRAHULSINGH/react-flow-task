import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = e => {
    e.preventDefault();
    setShowMenu(true);
    setTimeout(() => setShowMenu(false), 2000);
  };

  return (
    <div onContextMenu={handleContextMenu} style={{ border: '1px solid black', borderRadius: 5, padding: 10, background: '#fff' }}>
      {data.label}
      {showMenu && <div style={{ position: 'absolute', background: 'lightgrey', padding: 5, zIndex: 10 }}>Hello World</div>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CustomNode;
