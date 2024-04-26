import instance from "../baseApi/baseApi";

export const getAccountCLass = async () => {
    const response = await instance.get(`api/v1/Classes/teacher-or-student`);

    return response.data;
};

export const getCLassById = async (id) => {
    const response = await instance.get(`api/v1/Classes/detail/${id}`);

    return response.data;
};