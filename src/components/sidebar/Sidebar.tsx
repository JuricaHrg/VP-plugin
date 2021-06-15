import React from 'react';
import { Elements, Node } from 'react-flow-renderer';

interface IProps {
  clickedElement: Node | undefined;
  onElementsRemove: (elementsToRemove: any) => void;
}

const Sidebar: React.FC<IProps> = (props: IProps) => {
  const onDragStart = (event: any, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{ backgroundColor: 'white' }}>
      {!props.clickedElement ? (
        <>
          <div className='description'>You can drag these nodes to the pane on the left.</div>
          <div className='dndnode input' onDragStart={(event) => onDragStart(event, 'input')} draggable>
            Input Node
          </div>
          <div className='dndnode' onDragStart={(event) => onDragStart(event, 'default')} draggable>
            Default Node
          </div>
          <div className='dndnode output' onDragStart={(event) => onDragStart(event, 'output')} draggable>
            Output Node
          </div>
        </>
      ) : (
        <>
          <div className='dndnode'>{props.clickedElement.data.label}</div>
          <button onClick={() => props.onElementsRemove([props])}>Delete Node</button>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
