import instance from "../baseApi/baseApi";

export const loginApi = async (data) => {
  const response = await instance.post(
    `api/v1/authentication/login/email`,
    data
  );
  return response.data;
};

export const register = async ({ email, fullName, password, rePassword }) => {
  const response = await instance.post(`api/v1/authentication/register/email`, { email, fullName, password, rePassword });
  return response.data;
}
