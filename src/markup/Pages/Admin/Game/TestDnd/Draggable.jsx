import { useDraggable } from "@dnd-kit/core";

export const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      title: props.title,
      child: <DraggableContent title={props.title} />,
      resetChild: <h5>{props.title}</h5>,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {/* {props.children} */}
      {props.title}
    </button>
  );
};

const DraggableContent = (props) => {
  return (
    <button>
      {/* {props.children} */}
      {props.title}
    </button>
  );
};
