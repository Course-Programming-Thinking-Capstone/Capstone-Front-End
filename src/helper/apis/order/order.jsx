import instance from "../baseApi/baseApi";

export const getOrderList = async (filter) => {

  let statusParam =
    filter?.status === undefined ? "" : `status=${filter.status}&`;
  let pageSizeParam = filter?.pageSize === undefined ? "" : `pageSize=${filter.pageSize}&`;
  let pageParam =
    filter?.pageNumber === undefined ? "" : `pageNumber=${filter.pageNumber}`;


  const response = await instance.get(`api/v1/orders?${statusParam}${pageSizeParam}${pageParam}`);

  return response.data;
};

export const getOrderDetailById = async (id) => {
  const response = await instance.get(`api/v1/orders/detail/${id}`);
  return response.data;
}