import instance from "../baseApi/baseApi";

export const getScheduleByClassId = async ({id}) => {
    const response = await instance.get(`api/v1/Classes/schedules/${id}`);

    return response.data;
};