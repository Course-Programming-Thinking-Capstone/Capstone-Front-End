import instance from "../baseApi/baseApi";

export const getOrderList = async (filter) => {
  let statusParam =
    filter?.status === undefined ? "" : `?status=${filter.status}`;
  const response = await instance.get(`api/v1/orders${statusParam}`);

  return response.data;
};
