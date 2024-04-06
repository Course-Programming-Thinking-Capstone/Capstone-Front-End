import { useDroppable } from "@dnd-kit/core";
import { Button } from "react-bootstrap";

export const DroppableTest = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    border: "2px",
    borderRadius: "5px",
    borderColor: "grey",
    backgroundColor: isOver ? "grey" : "white",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <a
        className="d-block w-100"
        style={style}
        onClick={() =>
          props.handleResetChild({
            rowId: props.id,
            resetChildComponent: <h5>{`Test ${props.id}`}</h5>,
          })
        }
      >
        {props.child}
      </a>
    </div>
  );
};

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    backgroundColor: isOver ? "grey" : "white",
  };

  return (
    <div ref={setNodeRef} style={style} className="grid-item">
      <a
        className="d-block w-100"
        onClick={() =>
          props.handleResetChild({
            rowId: props.id,
            resetChildComponent: props.resetComponent,
          })
        }
      >
        {props.child}
      </a>
    </div>
  );
};
