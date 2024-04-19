import instance from "../baseApi/baseApi";

export const getGameModeApi = async () => {
  const response = await instance.get(`api/v1/games/game-mode`);
  return response.data;
};

export const getLevelDetailByModeIdApi = async ({ modeId }) => {
  const response = await instance.get(
    `api/v1/games/game-mode/${modeId}/game-level`
  );
  return response.data;
};

export const getLevelDetailByLevelIdApi = async ({ levelId }) => {
  const response = await instance.get(`api/v1/games/game-level/${levelId}`);
  return response.data;
};

export const updateGameLevelApi = async ({ data }) => {
  const response = await instance.put(`api/v1/games/game-level`, data);

  return response.data;
};

export const addLevelApi = async ({ data }) => {
  const response = await instance.post(`api/v1/games/game-level`, data);

  return response.data;
};

export const removeLevelApi = async ({ id }) => {
  const response = await instance.delete(`api/v1/games/game-level/${id}`);
  return response.data;
};

export const getAvailableCourseGame = async () => {
  const response = await instance.get(`api/v1/coursegames/available`);
  return response.data;
};
