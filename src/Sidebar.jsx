import React, { useEffect, useState } from 'react';
import blocks from './blocks.json'; // import local JSON file

const Sidebar = () => {
  const [blockList, setBlockList] = useState([]);

  useEffect(() => {
    setBlockList(blocks); // set block list from JSON
  }, []);

  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ width: 150, padding: 10, backgroundColor: '#f0f0f0' }}>
      {blockList.map(block => (
        <div
          key={block.id}
          draggable
          onDragStart={e => onDragStart(e, block.id)}
          style={{ marginBottom: 10, cursor: 'grab' }}
        >
          {block.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;


