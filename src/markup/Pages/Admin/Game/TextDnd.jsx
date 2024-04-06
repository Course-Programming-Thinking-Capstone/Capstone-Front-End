import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Draggable } from "./TestDnd/Draggable";
import { Droppable, DroppableTest } from "./TestDnd/Droppable";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const DragAndDropComponent = () => {
  const [array, setArray] = useState([
    { id: 1, title: "Test 1", child: <h5>Test 1</h5> },
    { id: 2, title: "Test 2", child: <h5>Test 2</h5> },
    { id: 3, title: "Test 3", child: <h5>Test 3</h5> },
    { id: 4, title: "Test 4", child: <h5>Test 4</h5> },
    { id: 5, title: "Test 5", child: <h5>Test 5</h5> },
    { id: 6, title: "Test 6", child: <h5>Test 6</h5> },
    { id: 7, title: "Test 7", child: <h5>Test 7</h5> },
    { id: 8, title: "Test 8", child: <h5>Test 8</h5> },
    { id: 9, title: "Test 9", child: <h5>Test 9</h5> },
    { id: 10, title: "Test 10", child: <h5>Test 10</h5> },
    { id: 11, title: "Test 11", child: <h5>Test 11</h5> },
    { id: 12, title: "Test 12", child: <h5>Test 12</h5> },
    { id: 13, title: "Test 13", child: <h5>Test 13</h5> },
    { id: 14, title: "Test 14", child: <h5>Test 14</h5> },
    { id: 15, title: "Test 15", child: <h5>Test 15</h5> },
    { id: 16, title: "Test 16", child: <h5>Test 16</h5> },
  ]);

  const [isDropped, setIsDropped] = useState(false);

  //sensor
  const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

  const handleResetChild = ({ rowId, resetChildComponent }) => {
    const updatedArray = array.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          title: `Test ${rowId}`,
          child: resetChildComponent,
        };
      }
      return row;
    });

    setArray(updatedArray);
  };

  //handle event when finish
  const handleDragEnd = (event) => {
    const { active, over } = event;

    //log
    console.log(`Active: ${active}`);

    if (active && over) {
      const updatedArray = array.map((row) => {
        if (row.id === over.id) {
          return {
            ...row,
            title: active.data.current.title,
            child: active.data.current.child,
          };
        }
        return row;
      });

      setArray(updatedArray);
    }

    console.log(event);
  };

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensor}
    >
      <Container className="mt-5">
        <Row>
          <Col md={8}>
            <Row>
              {array.map((row, key) => (
                <Col md={3} className="mb-5" key={key}>
                  <DroppableTest
                    id={row.id}
                    title={row.title}
                    child={row.child}
                    handleResetChild={handleResetChild}
                  ></DroppableTest>{" "}
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={4}>
            <div className="mb-2">
              <Draggable id={1} title="Drag me 1" />
            </div>
            <div className="mb-2">
              <Draggable id={2} title="Drag me 2" />
            </div>
            <div className="mb-2">
              <Draggable id={3} title="Drag me 3" />
            </div>
            <div className="mb-2">
              <Draggable id={4} title="Drag me 4" />
            </div>
          </Col>
        </Row>
      </Container>
    </DndContext>
  );
};
