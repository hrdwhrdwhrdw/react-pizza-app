import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";
import { setCurrentPage } from "../../redux/actions/filters";
import { useDispatch } from "react-redux";

const Pagination = () => {
  const dispatch = useDispatch();

  const handleCurrentPage = (currentPage) => {
    dispatch(setCurrentPage(currentPage));
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => handleCurrentPage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
