import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import CustomNode from './CustomNode';
import './App.css';

const nodeTypes = {
  custom: CustomNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [contextMenu, setContextMenu] = useState(null); // To store context menu position

  // Allow connection only from blockA to blockB
  const onConnect = useCallback(
    (params) => {
      const source = nodes.find((n) => n.id === params.source);
      const target = nodes.find((n) => n.id === params.target);

      if (source && target) {
        if (source.data.type === 'blockA' && target.data.type === 'blockB') {
          setEdges((eds) => addEdge(params, eds));
        } else {
          alert('Only connections from Block A to Block B are allowed');
        }
      }
    },
    [nodes, setEdges]
  );

  // When block is dropped from sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type || !reactFlowInstance) return;

      const position = reactFlowInstance.project({
        x: event.clientX - 200,
        y: event.clientY - 100,
      });

      const newNode = {
        id: getId(),
        type: 'custom',
        position,
        data: {
          label: type === 'blockA' ? 'Block A' : 'Block B',
          type,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Right-click on the canvas to show Hello World
  const onCanvasContextMenu = useCallback((e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  // Hide context menu when clicking anywhere
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div
        style={{ flexGrow: 1, position: 'relative' }}
        onContextMenu={onCanvasContextMenu}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={(event) => event.preventDefault()}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>

        {contextMenu && (
          <div
            className="context-menu-overlay"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            Hello World
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
}





