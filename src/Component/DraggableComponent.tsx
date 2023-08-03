import { Draggable } from "@hello-pangea/dnd";
import * as React from "react";

function DraggableComponent({ item, index }: { item: string; index: number }) {
  return (
    <Draggable draggableId={item} index={index}>
      {(draggableProvided) => (
        <li ref={draggableProvided.innerRef} {...draggableProvided.draggableProps} {...draggableProvided.dragHandleProps}>
          {item}
        </li>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableComponent);
