import React, { useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import simp from "../../../../images/gallery/simp.jpg";
import { useLocation } from "react-router-dom";
import instance from "../../../../helper/apis/baseApi/baseApi";

export default function GameData() {
  const location = useLocation();

  const { modeId, levels } = location.state;
  const [gameLevels, setGameLevels] = useState([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const response = await instance.get(
          `api/v1/games/game-mode/${modeId}/game-level`
        );
        const data = response.data;
        setGameLevels(data);
      } catch (error) {

      }
    };

    if (modeId) {
      fetchLevels();
    }
  }, [modeId]);

  return (
    <div className="admin-syllabus">
      <div className="syllabus">
        <div className="header">
          <div className="d-flex justify-content-start">
            <div>
              <h5 className="mb">GAME</h5>
              <hr />
            </div>
            <i className="fa-solid fa-book"></i>
          </div>
        </div>

        <div className="syllabus-content">
          <div className="d-flex justify-content-between">
            <div
              className="d-flex justify-content-start"
              style={{
                width: "30%",
                border: "1px solid #EF7E54",
                padding: "10px 15px",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <div className="text-center" style={{ width: "50%" }}>
                <h5 className="mb-0"> ... MODE</h5>
              </div>
              <div
                className="d-flex justify-content-around"
                style={{
                  width: "50%",
                  backgroundColor: "#FF8A00",
                  borderRadius: "10px",
                }}
              >
                <p className="mb-0">Total level</p>
                <span>{gameLevels.length}</span>
              </div>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#EF7E54",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "5px 10px",
                }}
              >
                <i className="fa-solid fa-circle-plus"></i> Create syllabus
              </button>
            </div>
          </div>

          <div>
            <div className="search d-flex justify-content-center">
              <input type="text" placeholder="Search course" />
              <div
                className="text-center"
                style={{
                  height: "30px",
                  border: "1px solid #988E8E66",
                  borderLeft: "none",
                  width: "5%",
                  paddingTop: "5px",
                  borderRadius: "0 10px 10px 0",
                }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>

            <div className="px-3">
              {gameLevels.map((level, index) => (
                <div key={index} className="syllabus-item">
                  <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-start">
                      <img className="img-responsive" src={simp} alt="" />
                      <div className="ms-3">
                        <p className="mb-1 mt-2">
                          Level {level.levelIndex + 1}{" "}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        className="mt-3"
                        style={{
                          width: "100px",
                          backgroundColor: "#EF7E54",
                          border: "none",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      >
                        View/Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center">
              <ReactPaginate />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
