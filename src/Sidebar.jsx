import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, type) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ width: 150, padding: 10, backgroundColor: '#f0f0f0' }}>
      <div draggable onDragStart={e => onDragStart(e, 'blockA')} style={{ marginBottom: 10 }}>Block A</div>
      <div draggable onDragStart={e => onDragStart(e, 'blockB')}>Block B</div>
    </aside>
  );
};

export default Sidebar;
