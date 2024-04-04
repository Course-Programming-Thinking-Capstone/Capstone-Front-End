import { useDroppable } from "@dnd-kit/core";

export const Droppable = (props) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? "green" : "red",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <button
        onClick={() =>
          props.handleResetChild({
            rowId: props.id,
            resetChildComponent: <h5>{`Test ${props.id}`}</h5>,
          })
        }
      >
        {props.child}
      </button>
    </div>
  );
};
