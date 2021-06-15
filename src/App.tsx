import React, { useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  addEdge,
  removeElements,
  Controls,
  Background,
  Node,
  ReactFlowProvider,
  Elements,
} from 'react-flow-renderer';
import Sidebar from './components/sidebar/Sidebar';
import './index.css';
import initialElements from './initialElements';

const onLoad = (reactFlowInstance: any) => {
  reactFlowInstance.fitView();
};
let id = 0;
const getId = () => `dndnode_${id++}`;

const App = () => {
  const reactFlowWrapper = useRef<any>();
  const [reactFlowInstance, setReactFlowInstance] = useState<any>();
  const [elements, setElements] = useState<any>(initialElements);
  const [selectedElement, setSelectedElement] = useState<any>();
  const onConnect = (params: any) => setElements((els: any) => addEdge(params, els));
  const onElementsRemove = (elementsToRemove: any) => setElements((els: any) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance: any) => setReactFlowInstance(_reactFlowInstance);

  function handleElementClick(e: any, element: any) {
    setSelectedElement(element);
  }

  function onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  function onDrop(event: any) {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper && reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node` },
    };

    setElements((es: Elements) => es.concat(newNode));
  }

  return (
    <div className='dndflow'>
      <ReactFlowProvider>
        <Sidebar clickedElement={selectedElement} onElementsRemove={onElementsRemove} />
        <div className='reactflow-wrapper' ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onElementClick={handleElementClick}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
            <MiniMap
              nodeStrokeColor={(n: any) => {
                if (n.style?.background) return n.style.background;
                if (n.type === 'input') return '#0041d0';
                if (n.type === 'output') return '#ff0072';
                if (n.type === 'default') return '#1a192b';
                return '#eee';
              }}
              nodeColor={(n: any) => {
                if (n.style?.background) return n.style.background;
                return '#fff';
              }}
              nodeBorderRadius={2}
            />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default App;
