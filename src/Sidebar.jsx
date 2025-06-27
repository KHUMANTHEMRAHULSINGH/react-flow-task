import React, { useEffect, useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    fetch('/blocks.json')
      .then((res) => res.json())
      .then((data) => setBlocks(data))
      .catch((err) => console.error("Failed to load blocks:", err));
  }, []);

  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="sidebar">
      {blocks.map((block) => (
        <div
          key={block.id}
          className="dndnode"
          onDragStart={(event) => onDragStart(event, block.type)}
          draggable
        >
          {block.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;


