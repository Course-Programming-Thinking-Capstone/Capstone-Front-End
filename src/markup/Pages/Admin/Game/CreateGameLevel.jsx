import React, { useState, useEffect, useRef } from "react";

import start from "../../../../images/icon/gameStart.png";
import street from "../../../../images/icon/gameStreet.png";
import rock from "../../../../images/icon/gameRock.png";
import end from "../../../../images/icon/gameEnd.png";

import arrowLeft from "../../../../images/icon/arrow-left.png";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Droppable } from "./TestDnd/Droppable";
import { Draggable } from "./TestDnd/Draggable";
import { Container, Row, Col } from "react-bootstrap";
import { addLevelApi } from "../../../../helper/apis/game/game";
import { ToastContainer, toast } from "react-toastify";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { Save } from "@mui/icons-material";
import { ModalNotification } from "../../../Layout/Components/Notification/ModalNotification";

export const CreateLevel = ({
  modeId,
  setAddLevel,
  setViewLevelDetail,
  handleReloadLevels,
}) => {
  //useState
  const [input, setInput] = useState({
    levelIndex: 0,
    coinReward: 10,
    gemReward: 10,
  });
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isVStartExist, setIsVStartExist] = useState(false);
  const [apiSuccessShow, setApiSuccessShow] = useState(false);

  //notification
  const notifyApiFail = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyApiSucess = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeButton: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const columns = 8;
  const rows = 6;

  //convert array index to postion
  const convertArrayIndexToPostion = (index, rows, columns) => {
    const quotient = Math.floor(index / columns);
    const remainder = index % columns;
    const position = columns * (rows - quotient - 1) + remainder + 1;
    return position;
  };

  //convert postion to array index
  const convertPositionToArrayIndex = (position, rows, columns) => {
    const quotient = Math.floor(position / columns);
    const remainder = position % columns;
    const index = columns * (rows - quotient - 1) + remainder - 1;
    return index;
  };

  //create updated array to update arr:
  const initArray = Array.from({ length: rows * columns }, (_, index) => ({
    id: convertArrayIndexToPostion(index, rows, columns),
    content: null,
    typeId: undefined,
  }));

  const [arr, setArr] = useState(initArray);

  const handleInputChange = (event) => {
    let value = parseInt(event.target.value) ?? 1;
    let name = event.target.name;
    if (name === "levelIndex") {
      let levelIndex = value - 1;
      if (levelIndex < 0) {
        levelIndex = 0;
      }
      if (levelIndex > 99) {
        levelIndex = 99;
      }
      setInput({ ...input, levelIndex: levelIndex });
    } else {
      if (value < 0) {
        value = 0;
      }
      if (value > 1000000) {
        value = 1000000;
      }
      setInput({ ...input, [name]: value });
    }
  };

  const handleBack = () => {
    setAddLevel(false);
    setViewLevelDetail(false);
  };

  const handleAddLevel = async () => {
    try {
      setIsSaveLoading(true);

      if (!isVStartExist) {
        throw new Error("Missing start position.");
      }

      let levelDetails = [];
      let vStartPosition = undefined;
      arr.forEach((element) => {
        if (element.typeId !== undefined) {
          if (element.typeId === 0) {
            vStartPosition = element.id;
          } else {
            levelDetails.push({
              vPosition: element.id,
              typeId: element.typeId,
            });
          }
        }
      });

      const data = {
        id: 0,
        coinReward: input.coinReward,
        gemReward: input.gemReward,
        levelIndex: input.levelIndex,
        vStartPosition: vStartPosition,
        gameLevelTypeId: modeId,
        levelDetail: levelDetails,
      };

      await addLevelApi({ data: data });

      // // alert("Add success");
      // notifyApiSucess("Add success");

      // setTimeout(() => {
      //   //back
      //   setAddLevel(false);
      //   setViewLevelDetail(false);
      //   handleReloadLevels(modeId);
      // }, 2000);
      setApiSuccessShow(true);
    } catch (error) {
      let errorMessage = null;
      if (error.response) {
        console.log(`Error response: ${JSON.stringify(error, null, 2)}`);
        errorMessage = error.response?.data?.message || "Undefined.";
      } else {
        console.log(`Error message: ${JSON.stringify(error, null, 2)}`);
        errorMessage = error.message || "Undefined.";
      }
      notifyApiFail(errorMessage);
    } finally {
      setIsSaveLoading(false);
    }
  };

  //Drag and Drop
  //handle event when finish
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active && over) {
      const updatedArray = arr.map((row) => {
        if (row.id === over.id) {
          if (row.typeId === 0) {
            setIsVStartExist(false);
          }
          return {
            ...row,
            content: active.data.current.child,
            typeId: active.data.current.typeId,
          };
        }
        return row;
      });

      if (active.data.current.typeId == 0) {
        setIsVStartExist(true);
      }

      setArr(updatedArray);
    }
  };

  //sensor
  const sensor = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

  const handleResetChild = ({ rowId, resetChildComponent }) => {
    const updatedArray = arr.map((row) => {
      if (row.id === rowId) {
        if (row.typeId === 0) {
          setIsVStartExist(false);
        }
        return {
          ...row,
          content: resetChildComponent,
          typeId: undefined,
        };
      }
      return row;
    });

    setArr(updatedArray);
  };

  const handleSuccessNotificationClose = () => {
    setApiSuccessShow(false);
    setAddLevel(false);
    setViewLevelDetail(false);
    handleReloadLevels(modeId);
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isSaveLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <ModalNotification message={"Create level success"} handleClose={handleSuccessNotificationClose} show={apiSuccessShow} />
      <div className="level-detail">
        <div className="d-flex justify-content-between">
          <div>
            <h5>Add level</h5>
          </div>
          <div>
            <button onClick={handleBack} className="admin-back">
              <div className="d-flex jutify-content-between align-items-center">
                <img src={arrowLeft} alt="Arrow Left Icon" />
                <p className="mb-0 mx-2">Back</p>
              </div>
            </button>
          </div>
        </div>

        <ToastContainer />
        <div className="d-flex justify-content-between align-items-end mb-4">
          <Container className="game-level-detail-menu-container">
            <Row className="pe-3">
              <Col md="4" className="px-0 pe-2">
                <p className="mb-1 blue fw-bold">Level index</p>
                <input
                  className="game-level-detail"
                  type="number"
                  name="levelIndex"
                  value={input.levelIndex + 1}
                  required
                  min={1}
                  max={100}
                  onChange={handleInputChange}
                />
              </Col>
              <Col md="4" className="px-0 pe-2">
                <p className="mb-1 blue fw-bold">Coin earn</p>
                <input
                  className="game-level-detail"
                  type="number"
                  name="coinReward"
                  value={input.coinReward}
                  required
                  min={0}
                  max={100}
                  onChange={handleInputChange}
                />
              </Col>
              <Col md="4" className="px-0 pe-2">
                <p className="mb-1 blue fw-bold">Game earn</p>
                <input
                  className="game-level-detail"
                  type="number"
                  name="gemReward"
                  value={input.gemReward}
                  required
                  min={0}
                  max={100}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Container>
          <div className="game-level-detail-menu-container-button">

            <div className="d-flex justify-content-end align-items-center">

              <button
                className="save me-2"
                onClick={handleAddLevel}
              >
                <div className="d-flex jutify-content-between align-items-center">
                  <Save fontSize="small" />
                  <p className="mb-0 mx-1">Save</p>
                </div>
              </button>
            </div>

          </div>
        </div>

        <div className="mt-3 d-flex">
          <DndContext
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            sensors={sensor}
          >
            <div className="map" style={{ width: "70%" }}>
              <div className="grid-container">
                {arr.map((a, index) => {
                  return (
                    <div key={index} className={`grid-item`}>
                      <Droppable
                        id={a.id}
                        child={a.content}
                        handleResetChild={handleResetChild}
                        resetComponent={null}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="map-item" style={{ width: "30%" }}>
              <div className="container-fluid game-level-detail-draggable">
                {/* Make these draggable */}
                <div className="row">
                  {isVStartExist === false && (
                    <div className="col-md-6 ">
                      <Draggable
                        id={1}
                        child={
                          <img
                            src={start}
                            style={{ width: "100%", height: "auto" }}
                            alt=""
                          />
                        }
                        resetChild={null}
                        typeId={0}
                      />
                    </div>
                  )}

                  <div className="col-md-6 ">
                    <Draggable
                      id={2}
                      child={
                        <img
                          src={street}
                          style={{ width: "100%", height: "auto" }}
                          alt=""
                        />
                      }
                      resetChild={null}
                      typeId={1}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 ">
                    <Draggable
                      id={3}
                      child={
                        <img
                          src={end}
                          style={{ width: "100%", height: "auto" }}
                          alt=""
                        />
                      }
                      resetChild={null}
                      typeId={2}
                    />
                  </div>

                  <div className="col-md-6 ">
                    <Draggable
                      id={4}
                      child={
                        <img
                          src={rock}
                          style={{ width: "100%", height: "auto" }}
                          alt=""
                        />
                      }
                      resetChild={null}
                      typeId={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DndContext>
        </div>
      </div>
    </>
  );
};
