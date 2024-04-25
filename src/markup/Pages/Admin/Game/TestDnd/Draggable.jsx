import { useDraggable } from "@dnd-kit/core";

export const DraggableTest = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      title: props.title,
      child: <DraggableContentTest title={props.title} />,
      resetChild: <h5>{props.title}</h5>,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {/* {props.children} */}
      {props.title}
    </div>
  );
};

const DraggableContentTest = (props) => {
  return (
    <div>
      {/* {props.children} */}
      {props.title}
    </div>
  );
};

export const Draggable = (props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
    data: {
      child: <DraggableContent child={props.child} />,
      resetChild: props.resetChild,
      typeId: props.typeId,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        width: "50px",
        height: "50px",
      }
    : {
        width: "100px",
        height: "100px",
        display: "block",
      };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {/* {props.children} */}
      {props.child}
    </div>
  );
};

const DraggableContent = (props) => {
  return <div>{props.child}</div>;
};
