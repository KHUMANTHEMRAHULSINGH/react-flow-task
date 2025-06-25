import React, { useState, useCallback } from 'react';
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

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [];
const initialEdges = [];

let id = 0;
const getId = () => `node_${id++}`;

function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => {
    const sourceNode = nodes.find(n => n.id === params.source);
    const targetNode = nodes.find(n => n.id === params.target);

    if (sourceNode?.data.type === 'blockA' && targetNode?.data.type === 'blockB') {
      setEdges(eds => addEdge(params, eds));
    } else {
      alert('Only Block A to Block B connections allowed');
    }
  }, [nodes]);

  const onDrop = useCallback(event => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - 200,
      y: event.clientY - 100,
    });
    const newNode = {
      id: getId(),
      type: 'custom',
      position,
      data: { label: type === 'blockA' ? 'Block A' : 'Block B', type },
    };
    setNodes(nds => nds.concat(newNode));
  }, [reactFlowInstance]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={event => event.preventDefault()}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
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

