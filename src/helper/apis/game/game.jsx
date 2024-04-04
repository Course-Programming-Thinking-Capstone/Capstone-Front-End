import instance from "../baseApi/baseApi";

export const getGameMode = async () => {
  const response = await instance.get(`api/v1/games/game-mode`);
  return response.data;
};

export const getLevelDetailByModeId = async ({ modeId }) => {
  const response = await instance.get(
    `api/v1/games/game-mode/${modeId}/game-level`
  );
  return response.data;
};

export const getLevelDetailByLevelId = async ({ levelId }) => {
  const response = await instance.get(`api/v1/games/game-level/${levelId}`);
  return response.data;
};
