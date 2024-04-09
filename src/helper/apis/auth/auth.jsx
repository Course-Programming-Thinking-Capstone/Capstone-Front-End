import instance from "../baseApi/baseApi";

export const loginApi = async (data) => {
  const response = await instance.post(
    `api/v1/authentication/login/email`,
    data
  );
  return response.data;
};
