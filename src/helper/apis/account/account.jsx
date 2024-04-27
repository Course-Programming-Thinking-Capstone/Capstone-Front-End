import instance from "../baseApi/baseApi";

export const changePassword = async (data) => {
    const response = await instance.post(
        `api/v1/users/account/password`,
        data
    );
    return response.data;
};