import { Button, ButtonGroup, Pagination } from "react-bootstrap";

export const CustomPagination = ({ page, totalPage, setPage }) => {
  const pageItems = [];
  for (let index = 1; index <= totalPage; index++) {
    pageItems.push(
      <Pagination.Item
        onClick={() => {
          setPage(index);
        }}
        active={index == page ? true : false}
      >
        {index}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="d-flex justify-content-center align-items-center">
      <Pagination.Prev
        disabled={page === 1 ? true : false}
        onClick={() => setPage(page - 1)}
      />

      {pageItems}

      <Pagination.Next
        disabled={page === totalPage ? true : false}
        onClick={() => setPage(page + 1)}
      />
    </Pagination>
  );
};
