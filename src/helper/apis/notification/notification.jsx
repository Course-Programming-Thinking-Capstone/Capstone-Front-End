import instance from "../baseApi/baseApi";

export const getNumberOfUnreadNotification = async () => {
    const response = await instance.get(`api/v1/notifications/account/number-of-unread`);

    return response.data;
};
