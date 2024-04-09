import instance from "../baseApi/baseApi";

export const getSyllabusById = async ({ id }) => {
  const response = await instance.get(`api/v1/syllabuses/${id}`);
  return response.data;
};

export const filterSyllabus = async (filter) => {
  let nameParam = filter.name === undefined ? "" : `name=${filter.name}&`;
  let statusParam =
    filter.status === undefined ? "" : `status=${filter.status}&`;
  let sortNameParam =
    filter.sortName == undefined ? "" : `sortName=${filter.sortName}&`;
  let sortCreatedDateParam =
    filter.sortCreatedDate === undefined
      ? ""
      : `sortCreatedDate=${filter.sortCreatedDate}&`;
  let pageParam = filter.page === undefined ? 1 : `page=${filter.page}&`;
  let sizeParam = filter.size === undefined ? 10 : `size=${filter.size}`;

  const response = await instance.get(
    `api/v1/syllabuses?${nameParam}${statusParam}${sortNameParam}${sortCreatedDateParam}${pageParam}${sizeParam}`
  );

  return response.data;
};

export const createSyllabus = async (data) => {
  const response = await instance.post(`api/v1/syllabuses`, data);
  return response.data;
};

export const filterTeacherSyllabus = async (filter) => {
  let nameParam = filter.name === undefined ? "" : `name=${filter.name}&`;
  let sortNameParam =
    filter.sortName == undefined ? "" : `sortName=${filter.sortName}&`;
  let sortCreatedDateParam =
    filter.sortCreatedDate === undefined
      ? ""
      : `sortCreatedDate=${filter.sortCreatedDate}&`;
  let pageParam = filter.page === undefined ? 1 : `page=${filter.page}&`;
  let sizeParam = filter.size === undefined ? 10 : `size=${filter.size}`;

  const response = await instance.get(
    `api/v1/syllabuses/teacher?${nameParam}${sortNameParam}${sortCreatedDateParam}${pageParam}${sizeParam}`
  );

  return response.data;
};
