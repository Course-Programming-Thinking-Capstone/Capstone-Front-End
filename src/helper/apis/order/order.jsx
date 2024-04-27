import instance from "../baseApi/baseApi";

export const getOrderList = async (filter) => {
  let statusParam =
    filter?.status === undefined ? "" : `status=${filter.status}`;
  let pageParam =
    filter?.pageNumber === undefined ? "" : `pageNumber=${filter.pageNumber}&`;
  const response = await instance.get(`api/v1/orders?pageSize=3&${pageParam}${statusParam}`);

  return response.data;
};
