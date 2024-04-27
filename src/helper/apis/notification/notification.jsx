import instance from "../baseApi/baseApi";

export const getNumberOfUnreadNotification = async () => {
    const response = await instance.get(`api/v1/notifications/account/number-of-unread`);

    return response.data;
};

export const filterAccountNotification = async ({ page, size }) => {
    const pageParam = page ? `page=${page}&` : "";
    const sizeParam = size ? `size=${size}` : "";
    const response = await instance.get(`api/v1/notifications/account?${pageParam}${sizeParam}`);

    return response.data;
}

export const markAllNotificationAsRead = async ({ page, size }) => {
    const pageParam = page ? `page=${page}&` : "";
    const sizeParam = size ? `size=${size}` : "";
    const response = await instance.patch(`api/v1/notifications/account?${pageParam}${sizeParam}`);

    return response.data;
}

export const markNotificationAsRead= async ({id}) => {
    const response = await instance.patch(`api/v1/notifications/account/${id}`);

    return response.data;
} 