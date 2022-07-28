import React from "react";
import styles from "./Pagination.module.scss";
import ReactPaginate from "react-paginate";

type PaginationTypes = {
  onPageChanged: (currentPage: number) => void;
};

const Pagination: React.FC<PaginationTypes> = ({ onPageChanged }) => {
  return (
    <ReactPaginate
      className={styles.pagination}
      breakLabel="..."
      nextLabel=" >"
      onPageChange={(event) => onPageChanged(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="< "
    />
  );
};

export default Pagination;
