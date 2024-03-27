import instance from "../baseApi/baseApi";

export const updateCourseApi = async ({ id, action, data }) => {
  let idParam = id === undefined ? "" : `${id}`;
  let actionParam = action === undefined ? "" : `?action=${action}`;

  const response = await instance.put(
    `api/v1/courses/${idParam}${actionParam}`,
    data
  );

  return response.data;
};

export const updateCoursePictureApi = async ({id, file}) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.patch(
    `api/v1/courses/${id}/picture`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getCoursesApi = async (filter) => {
  let nameParam = filter.name === undefined ? "" : `name=${filter.name}&`;
  let statusParam =
    filter.status === undefined ? "" : `status=${filter.status}&`;
  let sortNameParam =
    filter.sortName == undefined ? "" : `sortName=${filter.sortName}&`;
  let sortCreatedDateParam =
    filter.sortCreatedDate === undefined
      ? ""
      : `sortCreatedDate=${filter.sortCreatedDate}&`;
  let sortModifiedDateParam =
    filter.sortModifiedDate === undefined
      ? ""
      : `sortModifiedDate=${filter.sortModifiedDate}&`;
  let actionParam =
    filter.action === undefined ? "" : `action=${filter.action}&`;
  let pageParam = filter.page === undefined ? 1 : `page=${filter.page}&`;
  let sizeParam = filter.size === undefined ? 10 : `size=${filter.size}`;

  const response = await instance.get(
    `api/v1/courses?${nameParam}${statusParam}${sortNameParam}${sortCreatedDateParam}${sortModifiedDateParam}${actionParam}${pageParam}${sizeParam}`
  );

  return response.data;
};

export const getCourseById = async ({ id, action }) => {
  let actionParam = action === undefined ? "" : `?action=${action}`;
  const response = await instance.get(`api/v1/courses/${id}${actionParam}`);

  return response.data;
};
